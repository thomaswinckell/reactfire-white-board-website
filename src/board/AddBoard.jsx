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
            description: ''
        };
    }

    /**
     *
     */
    onClickAdd(){
        Actions.showAddForm();
    }


    handleNameChange(e){
        this.setState({ name : e.target.value });
    }

    handleDescriptionChange(e){
        this.setState({ description : e.target.value });
    }

    /**
     * called when submiting a new board
     * validations check only if the length of inputs are > 3
     * refresh the form and send the data to BoardManager.jsx
     * @param  {Event} e
     */
    handleSubmit(e){
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
            description: ''
        })
    }

    handleClose = () => {
        this.handleSubmit();
        this.setState({showAddForm: false});
    };

    renderForm(){

        const actions = [
            <FlatButton label="Ok" primary={true} keyboardFocused={true} onTouchTap={this.handleClose}/>,
        ];

        return(
            <Dialog title="Add a new board"
                actions={actions}
                modal={false}
                open={this.state.showAddForm}
                onRequestClose={this.handleClose}>
                    <TextField name='Name'placeholder={this.context.intl.formatMessage( translations.formNameInputPlaceholder )}
                       value={this.state.name}
                       onChange={this.handleNameChange.bind(this)}/>
                   <TextField style={{ width: 'auto'}} name='Description' placeholder={this.context.intl.formatMessage( translations.formDescriptionInputPlaceholder)}
                       value={this.state.description}
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
                <FloatingActionButton backgroundColor={"orange"}style={positionBottomRight} onClick={()=>this.setState({showAddForm : !this.state.showAddForm})}>
                    <ContentAdd />
                </FloatingActionButton>
                {this.state.showAddForm ?
                    this.renderForm() : null
                }
            </div>
        );
    }

}
