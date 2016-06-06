import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import {FormattedMessage}       from 'react-intl';
import translations             from '../i18n/messages/messages'
import FlatButton               from 'material-ui/FlatButton';
import TextField                from 'material-ui/TextField';
import FloatingActionButton     from 'material-ui/FloatingActionButton';
import ContentAdd               from 'material-ui/svg-icons/content/add';
import Dialog                   from 'material-ui/Dialog';
import * as Actions             from 'board/BoardManagerActions';

/**
 * Form to add a new board
 */
export default class AddBoard extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    constructor( props ) {
        super( props );
        this.state = {
            name: '',
            description: '',
            showAddForm : false
        };
    }

    handleNameChange(e){
        this.setState({ name : e.target.value });
    }

    handleDescriptionChange(e){
        this.setState({ description : e.target.value });
    }

    handleEnterPress = (e) => {
         e.charCode === 13 ? this.handleSubmit() : null;
    }

    openDialog = () => {
        window.addEventListener('keypress', this.handleEnterPress)
        this.setState({showAddForm : !this.state.showAddForm})
    }

    /**
     * called when submiting a new board
     * validations check only if the length of inputs are > 3
     * refresh the form and send the data to BoardManager.jsx
     * @param  {Event} e
     */
    handleSubmit = (e) => {
        e? e.preventDefault() : null;
        var name = this.state.name.trim();
        var description = this.state.description.trim();

        if( name.length < 3 || description.length < 3){
            //TODO show error message
            return;
        }

        Actions.addBoard({
            name : name,
            description: description
        });

        this.setState({
            name: '',
            description: '',
            showAddForm : false
        })
        window.removeEventListener('keypress', this.handleEnterPress);
    }

    handleClose = () => {
        this.setState({showAddForm: false});
        window.removeEventListener('keypress', this.handleEnterPress);
    };

    renderForm(){

        const actions = [
            <FlatButton label={this.context.intl.formatMessage( translations.Cancel )} primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton label={this.context.intl.formatMessage( translations.Create )} primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit}/>
        ];

        //TODO show input in red if validation not Ok
        return(
            <Dialog title={this.context.intl.formatMessage( translations.AddNewBoard )}
                actions={actions}
                modal={false}
                open={this.state.showAddForm}
                onRequestClose={this.handleClose}
                contentStyle={{maxWidth : '500px'}}>
                    <TextField autoFocus={true} name='Name'placeholder={this.context.intl.formatMessage( translations.formNameInputPlaceholder )}
                       value={this.state.name}
                       fullWidth={true}
                       onChange={this.handleNameChange.bind(this)}/>
                   <br/>
                   <TextField name='Description' placeholder={this.context.intl.formatMessage( translations.formDescriptionInputPlaceholder)}
                       value={this.state.description}
                       fullWidth={true}
                       multiLine={true}
                       onChange={this.handleDescriptionChange.bind(this)}/>
            </Dialog>
        );
    }

    render(){

        const positionBottomRight = {
            position    : 'fixed',
            bottom      : '100px',
            right       : '100px',
            zIndex      : 200
        }

        return(
            <div>
                <FloatingActionButton backgroundColor={"orange"}style={positionBottomRight} onClick={this.openDialog}>
                    <ContentAdd />
                </FloatingActionButton>
                {this.renderForm()}
            </div>
        );
    }

}
