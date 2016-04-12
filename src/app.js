import 'index.html';
import 'theme/main.scss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';

import {injectIntl,
        IntlProvider,
        FormattedRelative}      from 'react-intl';

import {addLocaleData}          from 'react-intl';
import en                       from 'react-intl/locale-data/en';
import fr                       from 'react-intl/locale-data/fr';
import frMessages               from 'intl/locales/fr.json';

addLocaleData([...en, ...fr]);

ReactDOM.render(
    <IntlProvider
        locale={navigator.language}
        messages={frMessages}
    >
        <App/>
    </IntlProvider>,
    document.getElementById( 'app-container' )
);
