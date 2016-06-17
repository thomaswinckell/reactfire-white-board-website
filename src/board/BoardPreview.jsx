import React,
       { Component, PropTypes } from 'react';

import { firebaseUrl }          from 'config/AppConfig';
import Firebase                 from 'firebase';
import translations             from '../i18n/messages/messages'

import Card                     from 'material-ui/Card/Card';
import CardActions              from 'material-ui/Card/CardActions';
import CardHeader               from 'material-ui/Card/CardHeader';
import CardMedia                from 'material-ui/Card/CardMedia';
import CardTitle                from 'material-ui/Card/CardTitle';
import TextField                from 'material-ui/TextField';
import Avatar                   from 'material-ui/Avatar';
import IconButton               from 'material-ui/IconButton';
import CardText                 from 'material-ui/Card/CardText';
import FontIcon                 from 'material-ui/FontIcon';
import Badge                    from 'material-ui/Badge';
import Dialog                   from 'material-ui/Dialog';
import FlatButton               from 'material-ui/FlatButton';
import RaisedButton             from 'material-ui/RaisedButton';
import ActionDeleteIcon         from 'material-ui/svg-icons/action/delete';
import ActionAspectRatio        from 'material-ui/svg-icons/action/aspect-ratio';
import PersonOnlineIcon         from 'material-ui/svg-icons/social/person-outline';
import EditIcon                 from 'material-ui/svg-icons/editor/mode-edit';
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

/**
 * Preview of a board shown as a Material Card
 */
export default class BoardPreview  extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    constructor( props ) {
        super( props );
        this.state = {
            presence : null,
            editMode : false,
            newName : '',
            newDescription : '',
            deletePopup : false
        };

        //TODO Find another place to load the presence
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
    * Fire an action to delete the board and close modal
    */
    handleDelete = () => {
        this.props.handleDelete( this.props.board.key );
        this.setState({
            deletePopup : false
        });
    }

    /**
     * Close the modal asking to confirm suppression of the current board
     */
    handleClose = () =>{
        this.setState({
            deletePopup : false
        });
    }

    /**
     * Dialog to confirm suppression of a board
     */
    renderDeleteDialog = () => {

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
     * Turn off edit mode and send modif to parent Component
     */
    saveEdit = () => {
        this.setState( { editMode : false } );
        this.props.handleSaveEdit( this.props.board, this.state );
        window.removeEventListener('keypress', this.handleEnterPress);
    }

    /**
     * Catch EnterKey pressed to end edit mode
     */
    handleEnterPress = ( e ) => {
         if ( e.charCode === 13 ){
             this.saveEdit();
         }
    }

    handleTitleChange = ( e ) => {
        this.setState({
            newName : e.target.value
        })
    }

    handleDescriptionChange = ( e ) => {
        this.setState({
            newDescription : e.target.value
        })

    }

    /**
     * Event when click on Edit Action
     * Turn on Edit mode or Save modification
     */
    onClickEdit = () => {
        if( this.state.editMode ){
            this.saveEdit();
        } else {
            this.setState( { editMode : true,
                             newDescription : this.props.board.val.description,
                             newName : this.props.board.val.name } )
            window.addEventListener('keypress', this.handleEnterPress)
        }
    }

    /**
     * Render the Header of a card
     * @param  {board} the board to preview
     * @return {CardHeader} A card header with the title of the board and the ppl on the board as Avatar
     */
    renderHeader = (board) => {

        const cardHeader = {
            fontSize: '200%',
            display : 'flex'
        }

        let userArray = null;
        if( this.state.presence){
          userArray = _.values(this.state.presence);
        }

        if( this.state.editMode ){
            return(
                <CardHeader title={ <TextField id='newName' value={ this.state.newName }
                        onChange={ this.handleTitleChange } style={ { fontSize : 'inherit',  height : 'inherit' } }
                        underlineShow={ false }
                        autoFocus={ true }
                        fullWidth={ true }/>}
                    titleStyle={ cardHeader }>
                    <div className={ styles.headerAvatar }>
                        {userArray ? this.renderPresence(userArray) : null}
                    </div>
                </CardHeader>
            )
        } else {
            return(
                <CardHeader title={ board.name } titleStyle={ cardHeader }>
                    <div className={ styles.headerAvatar }>
                        {userArray ? this.renderPresence(userArray) : null}
                    </div>
                </CardHeader>
            );
        }
    }

    /**
     * if userArray < MAX_AVATAR_LINE return a list of Avatar
     * else return a list of Avatar plus a 'there is more...' Avatar
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
               { user.picture ?
                   <Avatar size={AVATAR_SIZE} src={ user.picture }/> :
                   <Avatar size={AVATAR_SIZE} backgroundColor={ AvatarWithoutImageBGcolor }> { user.name[0].toUpperCase() } </Avatar> }
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
                {/* Avatar with X+ and tooltip with the list of people on not displayed on the list */}
                <Avatar size={ AVATAR_SIZE } style={ { fontSize : '20px' } } data-for={ 'id' + userArray.length } data-tip data-class={ styles.tooltipMore } backgroundColor={ andMoreBackground }>
                    { userArray.length - MAX_AVATAR_LINE }+
                    {/* Shows a number of names equals to MAX_AVATAR_TOOLTIP then shows 'and X more...' if there is more than MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP ppl on */}
                    <ReactTooltip id={ 'id' + userArray.length } place="bottom" type="dark" effect="solid">
                        <ul className = { styles.tooltipListName }>
                        { userArray.slice( MAX_AVATAR_LINE, MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP ).map( ( user ) =>
                            <li key={ user.name }> { user.name } </li>
                        )}
                        { userArray.length > MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP ? <li> and { userArray.length - (MAX_AVATAR_LINE + MAX_AVATAR_TOOLTIP) } more...</li> : null }
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

        const ActionDelete = (props) =>
            <IconButton onClick={ () => { this.setState( { deletePopup : true } ) } }>
                  <ActionDeleteIcon />
            </IconButton>

        const ActionGoToBoard = (props) =>
            <Link to={`/boards/${this.props.board.key}`}>
                <IconButton>
                    <ActionAspectRatio />
                </IconButton>
            </Link>

        const ActionEdit = (props) =>
            <IconButton onClick={ this.onClickEdit }>

                <EditIcon/>
            </IconButton>

        return(
            <CardActions>
                <ActionDelete/>
                <ActionGoToBoard/>
                <ActionEdit/>
            </CardActions>
        )
    }

    /**
     * Render card media in Edit or view Mode
     */
    renderCardMedia = ( board ) => {

        const styleMediaInput = {
            lineHeight      : 'inherit',
            fontSize        : 'inherit',
            color           : 'inherit',
            height          : 'inherit'
        }

        if( this.state.editMode ){
            return(
                <CardMedia overlay={<CardTitle title={board.name}
                    subtitle={ <TextField id='newName' value={ this.state.newDescription }
                            onChange={ this.handleDescriptionChange }
                            style={ styleMediaInput } inputStyle={ { color : 'inherit' } }
                            underlineShow={ false }
                            fullWidth={ true }/> } />}>
                    <img src={board.backgroundImage? board.backgroundImage : defaultBG} style={{height : 'inherit'}} />
                </CardMedia>
            )
        }

        return(
            <CardMedia overlay={<CardTitle title={board.name} subtitle={board.description} />}>
                <img src={board.backgroundImage? board.backgroundImage : defaultBG} style={{height : 'inherit'}} />
            </CardMedia>
        );
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
                    { this.renderHeader    ( board ) }
                    { this.renderCardMedia ( board ) }
                    { this.renderCardAction () }
               </Card>
               {this.renderDeleteDialog()}
           </div>
        )
    }
}
