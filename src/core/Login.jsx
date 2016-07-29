import React,
       { Component, PropTypes } from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import * as AuthActions         from 'core/AuthActions';
import AppLoader                from 'core/AppLoader';

import * as Styles              from './Login.scss';
import logosfeir                from 'images/logosfeir.png';

export default class Login  extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            load : false
        }
    }

    loadConnect(){
        this.setState({
            load : true
        })
    }

    onBtnClick = () => {
        AuthActions.logWithGoogle()
        .then( lol => {
            this.loadConnect();
        });
    }

// <h2 style={{ fontFamily : 'Roboto'}}> <span className={ Styles.squareBracket }> [ </span> SF≡IR <span className={ Styles.squareBracket }> ] </span>  </h2>
    render(){
        return (
            <div>
                <div className={ Styles.centerize }>
                    <img src={ logosfeir } alt='logosfeir' height='100px'/>
                    { !this.state.load ? <div>
                    <h4 className={ Styles.title }> Whiteboard </h4>
                        <button className={ Styles.googleButton }
                        onClick={ this.onBtnClick }>
                        <FormattedMessage {...translations.ButtonLogin}/>
                    </button> </div>: <AppLoader/> }
                </div>
            </div>
        );
    }
}
