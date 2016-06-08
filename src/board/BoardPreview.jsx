import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions';

import { firebaseUrl }          from 'config/AppConfig';
import Firebase                 from 'firebase';
import translations             from '../i18n/messages/messages'

import Card                     from 'material-ui/Card/Card';
import CardActions              from 'material-ui/Card/CardActions';
import CardHeader               from 'material-ui/Card/CardHeader';
import CardMedia                from 'material-ui/Card/CardMedia';
import CardTitle                from 'material-ui/Card/CardTitle';
import Avatar                   from 'material-ui/Avatar';
import IconButton               from 'material-ui/IconButton';
import CardText                 from 'material-ui/Card/CardText';
import FontIcon                 from 'material-ui/FontIcon';
import Badge                    from 'material-ui/Badge';
import Dialog                   from 'material-ui/Dialog';
import FlatButton               from 'material-ui/FlatButton';
import RaisedButton             from 'material-ui/RaisedButton';
import ActionDelete             from 'material-ui/svg-icons/action/delete';
import ActionAspectRatio        from 'material-ui/svg-icons/action/aspect-ratio';
import PersonOnlineIcon         from 'material-ui/svg-icons/social/person-outline';
import defaultBG                from 'images/defaultBackgroundImage.jpg';

import ReactTooltip             from 'react-tooltip';
import Guid                     from 'utils/Guid';

import {Link}                   from 'react-router';

import * as styles              from './BoardPreview.scss'


//Style and params const
const MAX_AVATAR_LINE           = 5;
const MAX_AVATAR_TOOLTIP        = 10;
const AVATAR_SIZE               = 44;
const AvatarWithoutImageBGcolor = '#EA9A28';
const andMoreBackground         = '#44403B';

export default class BoardPreview  extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    constructor( props ) {
        super( props );
        this.state = {
            presence : null,
            deletePopup : false
        };

        this.connectedRef = new Firebase( `${firebaseUrl}/presence/${this.props.board.key}` );
        this.connectedRef.on("value", (snap) => {
            this.setState({
                presence : snap.val() || null
            });
        });

    }

    componentWillUnmount(){
        this.connectedRef.off();
    }

    /**
    * Fire an action to delete the board and close the popUp
    */
    handleDelete =() => {
        Actions.deleteBoard(this.props.board.key);
        this.setState({
            deletePopup : false
        });
    }

    handleClose = () =>{
        this.setState({
            deletePopup : false
        });
    }

    /**
     * Dialog to confirm suppression of a board
     */
    renderDeleteDialog = () =>{

        const actions = [
            <FlatButton label={this.context.intl.formatMessage( translations.Cancel )} primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton label={this.context.intl.formatMessage( translations.Submit )} primary={true} onTouchTap={this.handleDelete}/>,
        ];

        return (
            <div>
                <Dialog title={this.context.intl.formatMessage( translations.ConfirmDelete )}
                        actions={actions}
                        modal={true}
                        open={this.state.deletePopup}
                        onRequestClose={this.handleClose}>
                    {this.context.intl.formatMessage( translations.ConfirmDeleteMessage )}
                </Dialog>
            </div>
        );
    }

    /**
    * redirect to the selected board
    */
    handleChangeGoTo = () =>{
        Actions.showBoard(this.props.board.key);
    }

    /**
     * Render the Header of a card
     * @param  {baord} board the board to preview
     * @return {CardHeader} A card header with the title of the board and the ppl on the board as Avatar
     */
    renderHeader = (board) =>{

        const cardHeader = {
            fontSize: '200%'
        }

        let userArray = null;
        if( this.state.presence){
          userArray = _.values(this.state.presence);
        }

        return(
            <CardHeader title={ board.name } titleStyle={ cardHeader }>
                <div className={ styles.headerAvatar }>
                    {userArray ? this.renderPresence(userArray) : null}
                </div>
            </CardHeader>
        );
    }

    /**
     * if userArray < 5 return a list of Avatar
     * else return a single Avatar with number of people on
     */
    renderPresence = (userArray) => {
        return(
            userArray.length <= MAX_AVATAR_LINE ? userArray.map( (user) => {
                return this.renderPresenceAvatar(user)
            }) : this.renderPresenceCounter(userArray)
           )
    }


    /**
     * Render 1 Avatar on the Card's header
     * @param  {Object} user {name, picture}
     * @return Avatar with tooltip
     */
    renderPresenceAvatar = (user) => {
        const id = Guid.generate();

        return (
           <div key={id} style={ { padding : '1.5px' } } data-for={'id' + id} data-tip>
               { user.picture ? <Avatar size={AVATAR_SIZE} src={ user.picture }/> : <Avatar size={AVATAR_SIZE} backgroundColor={ AvatarWithoutImageBGcolor }>{ user.name[0].toUpperCase()} </Avatar> }
               <ReactTooltip id={'id' + id} place="top" type="dark" effect="solid">
                   { user.name }
               </ReactTooltip>
           </div>
       )
    }

    /**
     * Return the Avatar header when there is more than 5 people on
     * @param  {Array} userArray Array of user { name + picture}
     * @return An avatar with number of ppl on + tooltip with all their names
     */
    renderPresenceCounter = (userArray) => {
        return(
            <div className={ styles.headerAvatar }>
            {userArray.slice(0,MAX_AVATAR_LINE).map( (user) => {
                return this.renderPresenceAvatar(user)
            })}
            <Avatar size={AVATAR_SIZE} style={ {fontSize : '20px' } } data-for={'id' + userArray.length} data-tip data-class={styles.tooltipMore} backgroundColor={andMoreBackground}>
                {userArray.length - MAX_AVATAR_LINE}+
                <ReactTooltip id={'id' + userArray.length} place="bottom" type="dark" effect="solid">
                    <ul className = { styles.tooltipListName }>
                    {userArray.slice(MAX_AVATAR_LINE, MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP).map( (user) => {
                        return (<li key={user.name}> {user.name} </li>)
                    })}
                    {userArray.length > MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP ? <li> and {userArray.length - (MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP)} more...</li> : null}
                    </ul>
                </ReactTooltip>
            </Avatar>
        </div>
        )
    }

    /**
     * Render the possible Actions on a board
     */
    renderCardAction = () => {
        return(
            <CardActions>
                <IconButton onClick={ () => { this.setState( { deletePopup : true } ) } }>
                    <ActionDelete />
                </IconButton>
                <Link to={`/boards/${this.props.board.key}`}>
                    <IconButton onClick={this.handleChangeGoTo}>
                        <ActionAspectRatio />
                    </IconButton>
                </Link>
            </CardActions>
        )
    }

    /**
     * Render the card to view board
     * + the dialog to delete a board
     */
    render(){
        const board = this.props.board.val;

        return(
            <div>
                <Card>
                    { this.renderHeader( board ) }
                    <CardMedia overlay={<CardTitle title={board.name} subtitle={board.description} />}>
                        <img src={board.backgroundImage? board.backgroundImage : defaultBG} style={{height : 'inherit'}} />
                    </CardMedia>
                    {this.renderCardAction()}
               </Card>
               {this.renderDeleteDialog()}
           </div>
        )
    }
}
