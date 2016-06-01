import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import {FormattedMessage}       from 'react-intl';
import translations             from '../i18n/messages/messages'

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
        e.preventDefault();
        var name = this.state.name.trim();
        var description = this.state.description.trim();

        if( name.length < 3 || description.length < 3){
            //TODO show error message
            return;
        }

        this.props.onBoardSubmit({
            name : name,
            description: description
        });

        this.setState({
            name: '',
            description: ''
        })
    }

    render(){

        var formStyle = {
            marginLeft      : '5%',
            textAlign       : 'center'
        };

        return(
            <form className="AddBoard" onSubmit = {this.handleSubmit.bind(this)}>
                <input type="text" placeholder={this.context.intl.formatMessage( translations.formNameInputPlaceholder )}
                       value={this.state.name}
                       onChange={this.handleNameChange.bind(this)}/>
               <input type="text" placeholder={this.context.intl.formatMessage( translations.formDescriptionInputPlaceholder)}
                           value={this.state.description}
                           onChange={this.handleDescriptionChange.bind(this)}/>
               <input type="submit" value={this.context.intl.formatMessage( translations.FormSubmitButton)} />
            </form>
        );
    }

}
