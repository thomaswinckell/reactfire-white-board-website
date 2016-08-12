import React,
       { Component, PropTypes } from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import * as Styles              from './NoBoardFound.scss';

export default class NoBoardFound extends Component  {

    render(){
        return(
            <h3 className={ Styles.title }> <FormattedMessage { ...translations.noBoardFound }/></h3>
        )
    }
}
