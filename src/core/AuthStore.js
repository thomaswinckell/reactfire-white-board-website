import { Store }        from 'airflux';
import Firebase         from 'firebase';
import $                from 'jquery';
import { firebaseUrl, clientId, authProxy }  from '../config/AppConfig';

import * as ErrorActions from '../error/ErrorActions';
import * as AuthActions  from 'core/AuthActions';
import * as NotifsActions from './NotifsActions';

import { browserHistory } from 'react-router';

class AuthStore extends Store {

    constructor() {
        super();
        this.state = {
            currentUser : {}
        };

        // Initialize Firebase
          var config = {
            apiKey: "AIzaSyDhUlTxshNHMt7ySbnH6cKAiKOWSKsH2Mk",
            authDomain: "whiteboardtest.firebaseapp.com",
            databaseURL: "https://whiteboardtest.firebaseio.com",
            storageBucket: "project-3447602719419946667.appspot.com",
          };
        firebase.initializeApp(config);
        this.baseRef = firebase.database().ref();
        this.auth = firebase.auth();
        this.auth.onAuthStateChanged( authData => this.onAuth( authData ) );
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
         this.auth2.getAuthInstance().signIn()
        .then((response) => {
         this.callbackGoogle(response);
        });
    }

    /*
        Send a request to the authentication proxy
        get a custom JWT to authenticate in Firebase
        TODO proxy in config
     */
    callbackGoogle( authData ){
        console.log(authData);
        var self = this;
        $.ajax(authProxy, {
            method: 'GET',
            data: {
            id_token: authData.getAuthResponse().id_token
        },
        success: function(data) {
            console.log('data', data);
            if(data.valid){
                self.auth.signInWithCustomToken(data.token)
                .catch( (error) => {
                    NotifsActions.pushNotif({
                        titleKey    : 'LoginFailed',
                        messageKey  : 'LoginFailedMessage',
                        level       : 'error',
                        autoDismiss : 10,
                        position    : 'br'
                    });
                    console.log("Login Failed!", error);
                })
                .then( (authData) => {
                    NotifsActions.pushNotif({
                        titleKey    : 'SuccessfullyLoggedIn',
                        messageKey  : 'Welcome',
                        message     :  ' ' + authData.auth.name,
                        autoDismiss : 5,
                        position    : 'br'
                    });
                    console.log("Login Succeeded!", authData);
                    self.onAuthSuccess(authData);
                    browserHistory.push('/');
                })
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
        // FIXME
        // TODO : propose other ways to authenticate : twitter, github and facebook (maybe anonymous too)
        //Nothing to do here anymore the router will redirect to /login
    }

    isCurrentUser( user ) {
        const { currentUser } = this.state;
        if ( !user || !currentUser ) {
            return false;
        }
        return currentUser.uid === user.uid;
    }

    _logout() {
        if( !this.auth2 ){
            this.loadGoogleScript(this._logout.bind( this ));
        } else {
            var self = this;
            //SetTimeout because we also need to wait for the token Manager to be loaded
            setTimeout( () => {
                self.auth2.getAuthInstance().signOut().then(function () {
                    browserHistory.push('/login');
                    self.baseRef.unauth();
                    self.state.currentUser = {};
                    self.publishState();
                });
            }, 500);
        }
    }
}

export default new AuthStore();
