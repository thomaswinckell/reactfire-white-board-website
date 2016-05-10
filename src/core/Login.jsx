import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import * as AuthActions         from 'core/AuthActions';

import HeaderApp                from 'core/HeaderApp';
import AuthStore                from 'core/AuthStore';

export default class Login  extends Component  {

    static propTypes = {
        buttonText: PropTypes.string,
        offline: PropTypes.bool,
        scope: PropTypes.string,
        cssClass: PropTypes.string,
        redirectUri: PropTypes.string,
        cookiePolicy: PropTypes.string
  };

    static defaultProps = {
        buttonText: 'Login with Google',
        scope: 'profile email',
        redirectUri: 'postmessage',
        cookiePolicy: 'single_host_origin',
        offline : false
  };

    constructor(props) {
        super(props);
    }

  componentDidMount() {
    const { scope, cookiePolicy } = this.props;
    const clientId = '286405553354-o1odslf1bfu1udpk4f9he1kh46l6vvvs.apps.googleusercontent.com';

    console.log('cookie', cookiePolicy);

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
        cookiepolicy: cookiePolicy,
        scope: scope
      };
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init(params);
      });
    }));
  }

    callbackGoogle(response){
        console.log(response);
    }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const { offline, redirectUri } = this.props;
    if (offline) {
      const options = {
        'redirect_uri': redirectUri
      };
      auth2.grantOfflineAccess(options)
        .then((data) => {
           AuthActions.onAuth(data);
        });
    } else {
      auth2.signIn()
        .then((response) => {
          AuthActions.onAuth(response);
        });
    }
  }

    render(){
        const style = {
            display: 'inline-block',
            background: '#d14836',
            color: '#fff',
            width: 250,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 2,
            border: '1px solid transparent',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Roboto'
        };
        const { cssClass, buttonText } = this.props;

        return (
            <div>
                <HeaderApp/>
                <button
                    className={cssClass}
                    onClick={this.onBtnClick.bind(this)}
                    style={cssClass ? {} : style}
                    >
                    {buttonText}
                </button>
            </div>
        );
        }
}
