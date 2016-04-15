import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import en                       from 'react-intl/locale-data/en';
import fr                       from 'react-intl/locale-data/fr';
import frMessages               from 'i18n/locales/fr.json';
import enMessages               from 'i18n/locales/en.json';
import {addLocaleData,
        IntlProvider}           from 'react-intl';

import BoardManager             from 'core/BoardManager';
import AuthStore                from 'core/AuthStore';
import BoardManagerStore        from 'core/BoardManagerStore';
import HeaderApp                from 'core/HeaderApp';
import AppLoader                from 'core/AppLoader';
import AccessDenied             from 'core/AccessDenied';


addLocaleData([...en, ...fr]);

// we need to make sure we transform the given locale to the right format first
// so we can access the right locale in our dictionaries for example: pt-br should be transformed to pt-BR
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
            localeNav : formatLocale(navigator.language)
        };

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
    }


    render() {

        const { currentUser } = this.state.authStore;
        const { boards } = this.state.boardManagerStore;
        //let localeNav = formatLocale(navigator.language);

        //Render AppLoader screen until data are loaded or user is not logged in
        if ( !currentUser ) {
            return (
                <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                    <AppLoader/>
                </IntlProvider>
            );
        }

        if(currentUser.denied){
            return (
                <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                    <AccessDenied/>
                </IntlProvider>
            );
        }

        return (
            <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                <div>
                    <HeaderApp />
                    <BoardManager boards = {boards} />
                </div>
            </IntlProvider>
        );
    }
}
