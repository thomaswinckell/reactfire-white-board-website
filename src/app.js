import 'index.html';
import 'theme/main.scss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';

import {addLocaleData,
        IntlProvider}           from 'react-intl';

import en                       from 'react-intl/locale-data/en';
import fr                       from 'react-intl/locale-data/fr';
import frMessages               from 'i18n/locales/fr.json';
import enMessages               from 'i18n/locales/en.json';
import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();
addLocaleData([...en, ...fr]);

// we need to make sure we transform the given locale to the right format first
// so we can access the right locale in our dictionaries for example: pt-br should be transformed to pt-BR
function formatLocale(lang) {
  lang = lang.split('-');
  return lang[0];
}


var localeNav = formatLocale(navigator.language);
//var localeNav = formatLocale('fr-CA');

function getLocalMessage(locale){
    console.log(locale.localeNav);
    switch (locale.localeNav) {
        case 'fr':
            return frMessages;
        case 'en':
            return enMessages;
        default: return enMessages;

    }
}

ReactDOM.render(
    <IntlProvider
        locale={localeNav}
        messages={getLocalMessage({localeNav})}
    >
        <App/>
    </IntlProvider>,
    document.getElementById( 'app-container' )
);
