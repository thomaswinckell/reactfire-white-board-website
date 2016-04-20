import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions'

import TextField                from 'material-ui/lib/text-field';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages'

export default class BoardSearchBar  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            value: ''
        };
    }

    handleChange(event){
        this.setState({
            value : event.target.value
        })
        Actions.filterText( event.target.value );
    }

    render(){

       return(
           <FormattedMessage {...translations.searchBarPlaceholder}>
           {placeholder => (
               <TextField placeholder={placeholder} value={this.state.value} onChange={this.handleChange.bind(this)}/>
           )}
           </FormattedMessage>
        )

    }


}
