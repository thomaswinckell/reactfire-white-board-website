import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions'

import TextField                from 'material-ui/TextField';

import {FormattedMessage}       from 'react-intl';
import translations             from '../i18n/messages/messages'
import Guid                     from 'utils/Guid';


/**
 * Search bar to look for boards
 */
export default class BoardSearchBar  extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    state = {
        value: ''
    };

    /**
     * Called everytime the value in the input change
     * fire an event to filter the boardlist to show
     * @param  {event} The value entered in the input
     */
    handleChange(event){
        this.setState({
            value : event.target.value
        });
        Actions.filterText( event.target.value );
    }

    /**
     * Render a material-ui TextFiel
     */
    render(){
       return(
           <TextField name='searchBar' fullWidth={true}
                      placeholder={this.context.intl.formatMessage( translations.searchBarPlaceholder) } value={this.state.value}
                      onChange={this.handleChange.bind(this)}/>
        )
    }
}
