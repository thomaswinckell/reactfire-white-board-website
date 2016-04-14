import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import {FormattedMessage} from 'react-intl';
import translations             from 'i18n/messages/messages'

export default class AddBoard extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            name: '',
            urlLink: '',
            description: ''
        };
        //this.handleNameChange         = this.handleNameChange.bind(this);
        //this.handleUrlChange          = this.handleUrlChange.bind(this);
        //this.handleDescriptionChange  = this.hanhandleDescriptionChangedleNameChange.bind(this);
    }

    handleNameChange(e){
        this.setState({
            name : e.target.value
        });
    }

    handleUrlChange(e){
        this.setState({
            urlLink : e.target.value
        });
    }

    handleDescriptionChange(e){
        this.setState({
            description : e.target.value
        });
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
        var urlLink = this.state.urlLink.trim();
        var description = this.state.description.trim();

        this.props.onBoardSubmit({
            name : name,
            urlLink: urlLink,
            description: description
        });

        this.setState({
            name: '',
            urlLink: '',
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
            marginLeft : '5%',
            textAlign : 'center'
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
                <FormattedMessage {...translations.formUrlInputPlaceholder}>
                {UrlInputText => (
                    <input type="text" placeholder={UrlInputText}
                           value={this.state.urlLink}
                           onChange={this.handleUrlChange.bind(this)} />
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
