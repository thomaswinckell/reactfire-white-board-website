import React, { Component }     from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import Styles                   from './Error404.scss';

export default class Error404 extends Component {

    render() {
        return (
            <div>
                <h1 className={ Styles.banner }> <span className={ Styles.squareBracket }> [ </span> 404 <span className={ Styles.squareBracket }> ] </span> </h1>
                <div className= { Styles.message }>
                    <h5>
                        <FormattedMessage { ...translations.error404sorry }  />
                    </h5>
                    <p>
                        <FormattedMessage { ...translations.error404look }  />
                    </p>
                    <br/>
                    <h3> ¯\_(ツ)_/¯ </h3>
                </div>
            </div>
        );
    }
}
