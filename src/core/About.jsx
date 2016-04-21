import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages'

export default class About  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            value: ''
        };
    }

    render(){

       return(
           <div>
               about lol
           </div>
        )
    }
}
