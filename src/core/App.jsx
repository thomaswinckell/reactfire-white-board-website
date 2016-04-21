import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import Firebase                 from 'firebase';

import { firebaseUrl }          from 'config/AppConfig';

import en                       from 'react-intl/locale-data/en';
import fr                       from 'react-intl/locale-data/fr';
import frMessages               from 'i18n/locales/fr.json';
import enMessages               from 'i18n/locales/en.json';
import {addLocaleData,
        IntlProvider}           from 'react-intl';

import ErrorStore               from 'error/ErrorStore';
import ErrorManager             from 'error/ErrorManager';
import AuthStore                from 'core/AuthStore';
import HeaderApp                from 'core/HeaderApp';
import AppLoader                from 'core/AppLoader';
import AccessDenied             from 'core/AccessDenied';
import BoardManager             from 'board/BoardManager';
import BoardManagerStore        from 'board/BoardManagerStore';
import * as Actions             from 'board/BoardManagerActions';
import WhiteBoard               from 'whiteboard';


addLocaleData([...en, ...fr]);

// we need to make sure we transform the given locale to the right format first
// so we can access the right locale in our dictionaries for example: fr-ca will be fr
function formatLocale(lang) {
  lang = lang.split('-');
  return lang[0];
}


//var localeNav = formatLocale('fr-CA');

function getLocalMessage(locale){
    switch (locale) {
        case 'fr':
            return frMessages;
        case 'en':
            return enMessages;
        default: return enMessages;

    }
}

@FluxComponent
export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            localeNav   : formatLocale(navigator.language),
            boardKey    : '',
            addForm     : false
        };

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
        this.connectStore( ErrorStore,              'errorStore' );
        Actions.showAddForm.listen( this._showAddForm.bind( this ) );
    }

    _showAddForm(){
        this.setState({
            addForm : !this.state.addForm
        });
    }

    handleLanguageChange(language){
        this.setState({
            localeNav : language
        })
    }

    render() {

        const { currentUser }   = this.state.authStore;
        const { boards }        = this.state.boardManagerStore;
        const { error }         = this.state.errorStore;
        //let localeNav = formatLocale(navigator.language);

        //Render AppLoader screen until data are loaded or user is not logged in
        if ( !currentUser ) {
            return (
                <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                    <HeaderApp onLanguageChange = {this.handleLanguageChange.bind(this)}/>
                    <AppLoader/>
                </IntlProvider>
            );
        }

        if( error && error.type ){
            return (
                <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                    <ErrorManager error={error} />
                </IntlProvider>
            );
        }

        //this.props.children or render home
        //Because of react-router app is the home
        //and we don't want to render the boardList on /about
        return (
            <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                {this.props.children ||
                <div>
                    <HeaderApp onLanguageChange = {this.handleLanguageChange.bind(this)}/>
                    {boards.length !== 0 ? <BoardManager boards = {boards} addForm={this.state.addForm}/> : <AppLoader/>}
                </div>
                }
            </IntlProvider>
        );
    }
}
