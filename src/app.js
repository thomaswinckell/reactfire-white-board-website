import 'index.html';
import 'theme/main.scss';

import _                        from 'lodash';
import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';
import About                    from 'core/About';
import WhiteboardView           from 'board/WhiteboardView';
import Error404                 from 'error/Error404';
import Login                    from 'core/Login';
import AuthStore                from 'core/AuthStore';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();

function requireAuth(nextState, replace) {
    if (_.isEmpty(AuthStore.currentUser)) {
        replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
        })
    }
}



ReactDOM.render((
    <Router history={browserHistory}>
       <Route path="/" component={App} >
            <IndexRoute onEnter={requireAuth}/>
           <Route path="/login" component={Login} />
           <Route path="/boards/:boardKey" component={WhiteboardView} onEnter={requireAuth}/>
           <Route path="/about" component={About}/>
           <Route path="*" component={Error404}/>
       </Route>
     </Router>
    ), document.getElementById('app-container')
);
