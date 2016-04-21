import 'index.html';
import 'theme/main.scss';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';
import About                    from 'core/About';
import WhiteboardView           from 'board/WhiteboardView';
import Error404                 from 'error/Error404';

import { Router, Route, browserHistory } from 'react-router';


import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render((
    <Router history={browserHistory}>
       <Route path="/" component={App}>
           <Route path="/boards/:boardKey" component={WhiteboardView}/>
           <Route path="/about" component={About}/>
           <Route path="*" component={Error404}/>
       </Route>
     </Router>
    ), document.getElementById('app-container')
);
