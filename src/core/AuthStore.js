import { Store }        from 'airflux';
import Firebase         from 'firebase';
import $                from 'jquery';
import { firebaseUrl, clientId, authProxy }  from '../config/AppConfig';

import * as AuthActions  from 'core/AuthActions';
import * as NotifsActions from './NotifsActions';

import { browserHistory } from 'react-router';


// TODO : a store should not perform any action on the router. The app should listen to store update and do the redirections. The app control the navigation, not the store.

class AuthStore extends Store {

    constructor() {
        super();
        this.state = {
            currentUser : {}
        };
        this.baseRef = new Firebase( firebaseUrl );
        this.baseRef.onAuth( authData => this.onAuth( authData ) );
        AuthActions.logWithGoogle.listen( this._logWithGoogle.bind( this ) );
        AuthActions.logout.listen( this._logout.bind( this ) );

        this.loadGoogleScript();
}
    get currentUser() { return this.state.currentUser || {}; }

    destroy() {
        if ( this.baseRef ) {
            this.baseRef.off();
        }
    }

    onAuth( authData ) {
        console.log( 'DEBUG token expiration: authData' , authData);
        //TODO might check expiration time and redirect to failure #FUCKING firebase 3
        if ( authData ) {
            this.onAuthSuccess( authData );
        } else {
            this.onAuthFailure();
        }
    }

    /**
     * manage oauth
     * redirect to the main page after loggin
     * @param  authData callback sent by the provider (here google)
     */
    onAuthSuccess( authData ) {
        this.state.currentUser = {
            uid             : authData.uid,
            displayName     : authData.auth.name || 'Guest',
            profileImageURL : authData.auth.picture || 'img/default_profile.png', // TODO : A DEFAULT picture image
            locale          : authData.auth.locale ? authData.auth.locale : 'en',
            hd              : authData.auth.hd
        };
        this.publishState();

    }

    loadGoogleScript(){
        // YOLO
        (function(d, s, id, cb) {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            js = d.createElement(s);
            js.id = id;
            js.src = '//apis.google.com/js/platform.js';
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = cb;
            }(document, 'script', 'google-login', () => {
                const params = {
                    client_id: clientId,
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile email'
                };
                window.gapi.load('auth2', () => {
                    window.gapi.auth2.init(params);
                    this.auth2 = window.gapi.auth2;
                });
            })
        );
    }

    _logWithGoogle(){
        return new Promise( ( resolve, reject) => {
            resolve(true);
            this.auth2.getAuthInstance().signIn()
            .then((response) => {
                this.callbackGoogle(response, resolve);
            });
        });
    }

    /*
        Send a request to the authentication proxy
        get a custom JWT to authenticate in Firebase
     */
    callbackGoogle( authData , resolve){
        var self = this;
        $.ajax(authProxy, {
            method: 'GET',
            data: {
            id_token: authData.getAuthResponse().id_token
        },
        success: function(data) {
            if(data.valid){
                self.baseRef.authWithCustomToken(data.token, function(error, authData) {
                    if (error) {
                        NotifsActions.pushNotif({
                            titleKey    : 'LoginFailed',
                            messageKey  : 'LoginFailedMessage',
                            level       : 'error',
                            autoDismiss : 10,
                            position    : 'br'
                        });
                        console.log("Login Failed!", error);
                    } else {
                        NotifsActions.pushNotif({
                            titleKey    : 'SuccessfullyLoggedIn',
                            messageKey  : 'Welcome',
                            message     :  ' ' + authData.auth.name,
                            level       : 'success',
                            autoDismiss : 5,
                            position    : 'br'
                        });
                        console.log("Login Succeeded!", authData);
                        self.onAuthSuccess(authData);
                        browserHistory.push('/');
                    }
                });
            } else {
                NotifsActions.pushNotif({
                    titleKey    : 'AuthenticationDenied',
                    messageKey  : 'AuthenticationDeniedMessage',
                    level       : 'error',
                    autoDismiss : 10,
                    position    : 'br'
                });
            }
        },
        });
    }

    onAuthFailure() {
        browserHistory.push('/login');
    }

    isCurrentUser( user ) {
        const { currentUser } = this.state;
        if ( !user || !currentUser ) {
            return false;
        }
        return currentUser.uid === user.uid;
    }

    _logout() {
        browserHistory.push('/login');
        this.auth2.getAuthInstance().signOut().then( () => {
            this.baseRef.unauth();
            this.state.currentUser = {};
            this.publishState();
        });
    }
}

export default new AuthStore();
