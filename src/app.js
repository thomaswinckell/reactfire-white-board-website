import 'index.html';
import 'theme/main.scss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';
import About                    from 'core/About';
import WhiteboardView           from 'board/WhiteboardView';

import { Router, Route, hashHistory } from 'react-router';


import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render((
    <Router history={hashHistory}>
       <Route path="/" component={App}>
       </Route>
       <Route path="/board/:boardKey" component={WhiteboardView}/>
       <Route path="/about" component={About}/>
     </Router>
    ), document.getElementById('app-container')
);
