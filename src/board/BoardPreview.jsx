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

        this.handleChangeGoTo   = this.handleChangeGoTo.bind( this );
        this.handleDelete       = this.handleDelete.bind( this );
        this.handleClose        = this.handleClose.bind ( this );
        this.renderHeader       = this.renderHeader.bind( this );
    }

    componentWillUnmount(){
        this.connectedRef.off();
    }

    /**
    * Fire an action to delete the board and close the popUp
    */
    handleDelete(){
        Actions.deleteBoard(this.props.board.key);
        this.setState({
            deletePopup : false
        });
    }

    handleClose(){
        this.setState({
            deletePopup : false
        });
    }

    /**
     * Dialog to confirm suppression of a board
     */
    renderDeleteDialog(){

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
    handleChangeGoTo(){
        Actions.showBoard(this.props.board.key);
    }

    renderHeader(board){

        const cardHeader = {
            fontSize: '200%'
        }

        const style= {float : 'right', display : 'flex'}

        let userArray = null;
        if( this.state.presence){
          userArray = _.values(this.state.presence);
        }
        return(
            <CardHeader title={board.name} titleStyle={cardHeader}>
                <div style = { style}>
                    {userArray? userArray.map( (user) => {
                        return this.renderPresence(user)
                    }) : null}
                </div>
            </CardHeader>
        );
    }

    renderPresence = (user) => {
        const id = Guid.generate();

        const AvatarWithoutImageBGcolor = '#0288D1';

        return (
           <div key={id} style={{paddingLeft : '3px'}} data-for={'id' + id} data-tip>
               { user.picture ? <Avatar src={ user.picture }/> : <Avatar backgroundColor={AvatarWithoutImageBGcolor}>{user.name[0].toUpperCase()} </Avatar> }
               <ReactTooltip id={'id' + id} place={'top'} type="light" effect="solid">
                   {user.name}
               </ReactTooltip>
           </div>
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
                    {this.renderHeader(board)}
                    <CardMedia overlay={<CardTitle title={board.name} subtitle={board.description} />}>
                        <img src={board.backgroundImage? board.backgroundImage : defaultBG} style={{height : 'inherit'}} />
                    </CardMedia>
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
               </Card>
               {this.renderDeleteDialog()}
           </div>
        )
    }
}
