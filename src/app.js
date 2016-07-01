import 'index.html';
import 'theme/main.scss';

import _                        from 'lodash';
import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from 'core/App';
import Home                     from 'core/Home'
import About                    from 'core/About';
import WhiteboardView           from 'board/WhiteboardView';
import Login                    from 'core/Login';
import AuthStore                from 'core/AuthStore';
import Error404                 from 'core/Error404';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();

/**
 * Check if the user is authentifieed to access the ressource
 * redirect to /login if not
 */
function requireAuth(nextState, replace) {
    if (_.isEmpty(AuthStore.currentUser)) {
        replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
        })
    }
}

/**
 * Routes of our application
 * URL                  Component
 * /                    App -> Home
 * /About               App -> About
 * boards/:boardKey     App -> WhiteboardView
 * @type {Object}
 */
const routes = {
    path: '/',
    component   : App,
    indexRoute  : { component: Home, onEnter : requireAuth },
    childRoutes : [
        { path: 'boards/:boardKey'     , component : WhiteboardView , onEnter : requireAuth },
        { path: 'about'                , component : About },
        { path: 'login'                , component : Login },
        { path: '*'                    , component : Error404 }
    ]
}

ReactDOM.render((
    <Router history={browserHistory} routes={ routes }/>
    ), document.getElementById('app-container')
);
