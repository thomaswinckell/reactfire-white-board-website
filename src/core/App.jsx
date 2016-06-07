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

import AuthStore                from 'core/AuthStore';
import HeaderApp                from 'core/HeaderApp';
import BoardListView            from 'board/BoardListView';
import Notification             from './Notification';

import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme           from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme              from 'material-ui/styles/getMuiTheme';

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
            localeNav               : formatLocale(navigator.language)
        };

        this.connectStore( AuthStore,               'authStore' );

    }

    handleLanguageChange(language){
        this.setState({
            localeNav : language
        })
    }

    render() {
        const { currentUser }                   = this.state.authStore;
        //let localeNav = formatLocale(navigator.language);

        const lightMuiTheme = getMuiTheme(lightBaseTheme);


        //this.props.children or render home
        //Because of react-router app is the home
        //and we don't want to render the boardList on /about
        return (
            <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <div>
                        <HeaderApp onLanguageChange = {this.handleLanguageChange.bind(this)}/>
                        <Notification/>
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </IntlProvider>
        );
    }
}
