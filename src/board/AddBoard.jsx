import React,
       { Component, PropTypes } from 'react';
import FlatButton               from 'material-ui/FlatButton';
import TextField                from 'material-ui/TextField';
import SelectField              from 'material-ui/SelectField';
import MenuItem                 from 'material-ui/MenuItem';
import FloatingActionButton     from 'material-ui/FloatingActionButton';
import ContentAdd               from 'material-ui/svg-icons/content/add';
import Dialog                   from 'material-ui/Dialog';

import Form, {
    FormField }                 from 'react-forms-validation';
import MessageError             from 'core/MessageError';
import Board                    from './Board';
import BoardTypes               from '../config/boardType';

import translations             from '../i18n/messages/messages';

import * as Actions             from 'board/BoardManagerActions';



/**
 * Form to add a new board
 */
export default class AddBoard extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    static defaultProps = {
        position : {
            position    : 'fixed',
            bottom      : '3em',
            right       : '3em',
            zIndex      : 200
        }
    }

    constructor( props ) {
        super( props );
        this.state = {
            board : new Board(),
            validity : null,
            showAddForm : false
        };
    }

    openDialog = () => {
        window.addEventListener( 'keypress', this.handleEnterPress );
        this.setState( { showAddForm : !this.state.showAddForm } );
    };

    /**
     * called when submiting a new board
     * validations check only if the length of inputs are > 3
     * refresh the form and send the data to BoardManager.jsx
     * @param  {Event} e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const valid = this.state.validity && this.state.validity.valid;
        if( !valid) {
            return ;
        }

        Actions.addBoard( this.state.board );

        this.setState({
            board : new Board(),
            showAddForm : false
        });
    };

    handleClose = () => {
        this.setState({showAddForm: false});
    };

    handleChange = ( board, validity ) => {
        this.setState( { board, validity } )
    };

    shouldShowError( fieldValidity ) {
        return fieldValidity.invalid && this.state.validity && this.state.validity.dirty;
    }

    renderName = ( prop, value, onChange, fieldValidity ) => {
        return (
            <TextField autoFocus={true} name={ this.context.intl.formatMessage( translations.boardForm.name.label ) }
                       placeholder={this.context.intl.formatMessage( translations.formNameInputPlaceholder )}
                       value={value || ''}
                       fullWidth={true}
                       errorText={ this.shouldShowError( fieldValidity ) ? <MessageError prop={ prop } validity={ fieldValidity } /> : null }
                       onChange={ e => onChange( e.target.value ) }/>
        );
    };

    renderDescription = ( prop, value, onChange, fieldValidity ) => {
        return (
            <TextField name={ this.context.intl.formatMessage( translations.boardForm.description.label ) }
                       placeholder={this.context.intl.formatMessage( translations.formDescriptionInputPlaceholder )}
                       value={value || ''}
                       errorText={ this.shouldShowError( fieldValidity ) ? <MessageError prop={ prop } validity={ fieldValidity } /> : null }
                       fullWidth={true}
                       multiLine={true}
                       onChange={e => onChange( e.target.value )}/>
        );
    };

    //TODO init value
    renderWidgetElement = (  prop, value, onChange, fieldValidity ) => {
        return(
            <SelectField  value={value || onChange(1)} onChange={(e, i , v) => onChange(v)}
                          errorText={ this.shouldShowError( fieldValidity ) ? <MessageError prop={ prop } validity={ fieldValidity } /> : null}>
                {BoardTypes.map( (type, index) => {
                        return <MenuItem key={ index+1 }value={ index+1 } primaryText={ Object.keys(type)[0] } />
                    })
                }
            </SelectField>
        );
    }

    renderForm(){
        const valid = this.state.validity && this.state.validity.valid;

        const actions = [
            <FlatButton label={this.context.intl.formatMessage( translations.Cancel )} primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton disabled={!valid} label={this.context.intl.formatMessage( translations.Create )} primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit}/>
        ];

        return(
            <Dialog title={this.context.intl.formatMessage( translations.AddNewBoard )}
                actions={actions}
                modal={false}
                open={this.state.showAddForm}
                onRequestClose={this.handleClose}
                contentStyle={{maxWidth : '500px'}}>

                <Form value={ this.state.board } onChange={ this.handleChange } onSubmit={this.handleSubmit}>
                    <FormField prop="name" render={ this.renderName }/>
                    <br/>
                    <FormField prop="description" render={ this.renderDescription }/>
                    <FormField prop="type" render={ this.renderWidgetElement }/>
                </Form>
            </Dialog>
        );
    }

    render(){

       return(
            <div>
                <FloatingActionButton backgroundColor='orange' style={ this.props.position } onClick={ this.openDialog }>
                    <ContentAdd />
                </FloatingActionButton>
                { this.renderForm() }
            </div>
        );
    }

}
