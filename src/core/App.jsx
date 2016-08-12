import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import en                       from 'react-intl/locale-data/en';
import fr                       from 'react-intl/locale-data/fr';
import frMessages               from 'i18n/locales/fr.json';
import {addLocaleData,
        IntlProvider}           from 'react-intl';

import HeaderApp                from 'core/HeaderApp';
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

function getLocalMessage(locale){
    switch (locale) {
        case 'fr':
            return frMessages;
    }
}

/**
 * Wrapper component that display the headerBar and Notifications on all routes
 * Manage i18n and theme
 */
@FluxComponent
export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            localeNav : formatLocale(navigator.language)
        };
    }

    handleLanguageChange = (language) => {
        this.setState({
            localeNav : language
        })
    }

    render() {
        const lightMuiTheme = getMuiTheme( lightBaseTheme );

        return (
            <IntlProvider locale={ this.state.localeNav } messages={ getLocalMessage( this.state.localeNav ) }>
                <MuiThemeProvider muiTheme={ lightMuiTheme }>
                    <div>
                        <HeaderApp onLanguageChange={ this.handleLanguageChange }/>
                        <Notification/>
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </IntlProvider>
        );
    }
}
