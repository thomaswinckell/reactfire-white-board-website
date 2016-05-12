import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import {FormattedMessage}       from 'react-intl';
import translations             from '../i18n/messages/messages'

export default class AddBoard extends Component  {

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
     No validations are made
     refresh the form and send the data to BoardManager.jsx
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
        return this.renderForm();
    }

    /**
     * Maybe create a new component??
    */
    renderForm(){

        var formStyle = {
            marginLeft      : '5%',
            paddingTop      : '1%',
            paddingBottom   : '1%',
            textAlign       : 'center'
        }

        return(
            <form className="AddBoard" onSubmit = {this.handleSubmit.bind(this)} style={formStyle}>
                <FormattedMessage {...translations.formNameInputPlaceholder}>
                {nameInputText => (
                    <input type="text" placeholder={nameInputText}
                           value={this.state.name}
                           onChange={this.handleNameChange.bind(this)}/>
                )}
                </FormattedMessage>
                <FormattedMessage {...translations.formDescriptionInputPlaceholder}>
                {DescriptionInputText => (
                    <input type="text" placeholder={DescriptionInputText}
                           value={this.state.description}
                           onChange={this.handleDescriptionChange.bind(this)}/>
                )}
                </FormattedMessage>
                <FormattedMessage {...translations.FormSubmitButton}>
                {SubmitButton => (
                    <input type="submit" value={SubmitButton} />
                )}
                </FormattedMessage>
            </form>
        );
    }

}
