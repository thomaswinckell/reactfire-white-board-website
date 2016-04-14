import 'index.html';
//import 'theme/main.scss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';

import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
        <App/>,
    document.getElementById( 'app-container' )
);
