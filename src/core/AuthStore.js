import { Store }        from 'airflux';
import Firebase         from 'firebase';

import { firebaseUrl }  from '../config/AppConfig';

import * as ErrorActions from '../error/ErrorActions';

class AuthStore extends Store {

    constructor() {
        super();
        this.state = {};
        this.baseRef = new Firebase( firebaseUrl );
        this.baseRef.onAuth( authData => this.onAuth( authData ) );
    }

    get currentUser() { return this.state.currentUser || {}; }

    destroy() {
        if ( this.baseRef ) {
            this.baseRef.off();
        }
    }

    /*
    Check if the user uses a sfeir.lu email
     */
    onAuth( authData ) {
        if ( authData ) {
            //if(authData.google.cachedUserProfile.hd == "sfeir.lu"){
                this.onAuthSuccess( authData );
            //} else {
            //    this.onAuthDenied(); }
        } else {
            this.onAuthFailure();
        }
    }

    onAuthDenied(){
        this.state.currentUser = {
            denied : true
        }
        this.publishState();
    }

    /**
     * manage oauth
     * save the user if he isn't in the database
     * @param  authData callback sent by the provider (here google)
     */
    onAuthSuccess( authData ) {
        this.state.currentUser = {
            uid             : authData.uid,
            displayName     : authData.google.displayName || 'Guest',
            profileImageURL : authData.google.profileImageURL || 'img/default_profile.png', // TODO : A DEFAULT picture image
            locale          : authData.google.cachedUserProfile && authData.google.cachedUserProfile.locale ? authData.google.cachedUserProfile.locale : 'en',
            hd              : authData.google.cachedUserProfile.hd
        };
        this.baseRef.child('users').child(authData.uid).once('value', exist =>{
            if(exist.val() === null){
                this.baseRef.child('users').child(authData.uid).set({
                    name            : authData.google.displayName,
                    hd              : authData.google.cachedUserProfile.hd || authData.google.email.split('@')[1]
                }, error => {
                    if(error){
                        ErrorActions.throwError(error);
                    }
                    else { console.log('inscription ok') }
                    this.publishState();
                });
            } else {
                console.log('user already in DB');
                this.publishState();
            }
        })
    }

    onAuthFailure() {
        // FIXME
        // TODO : propose other ways to authenticate : twitter, github and facebook (maybe anonymous too)
        this.baseRef.authWithOAuthRedirect("google", function(error) {
            if (error) {
                console.log("Login Failed !", error);
            } else {
                // We'll never get here, as the page will redirect on success.
            }
        },{
            remember: "sessionOnly",
            scope: "email"
        }
        );
    }

    isCurrentUser( user ) {
        const { currentUser } = this.state;
        if ( !user || !currentUser ) {
            return false;
        }
        return currentUser.uid === user.uid;
    }

    logout() {
        this.baseRef.unauth();
    }
}

export default new AuthStore();
