import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import Firebase                 from 'firebase';

import { firebaseUrl }          from 'config/AppConfig';

import en                       from 'react-intl/locale-data/en';
import fr                       from 'react-intl/locale-data/fr';
import frMessages               from 'i18n/locales/fr.json';
import enMessages               from 'i18n/locales/en.json';
import {addLocaleData,
        IntlProvider}           from 'react-intl';

import ErrorStore               from 'error/ErrorStore';
import ErrorManager             from 'error/ErrorManager';

import AuthStore                from 'core/AuthStore';
import HeaderApp                from 'core/HeaderApp';
import AppLoader                from 'core/AppLoader';
import AccessDenied             from 'core/AccessDenied';
import BoardListView            from 'board/BoardListView';
import BoardManagerStore        from 'board/BoardManagerStore';
import * as Actions             from 'board/BoardManagerActions';
import AddBoard                 from 'board/AddBoard';
import NoBoardFound             from 'board/NoBoardFound';
import WhiteBoard               from 'whiteboard';
import NotificationSystem       from 'react-notification-system';
import * as NotifsActions       from './NotifsActions';

import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme           from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme              from 'material-ui/styles/getMuiTheme';

addLocaleData([...en, ...fr]);

// we need to make sure we transform the given locale to the right format first
// so we can access the right locale in our dictionaries for example: fr-ca will be fr
function formatLocale(lang) {
  lang = lang.split('-');
  return lang[0];
}


//var localeNav = formatLocale('fr-CA');

function getLocalMessage(locale){
    switch (locale) {
        case 'fr':
            return frMessages;
        case 'en':
            return enMessages;
        default: return enMessages;

    }
}

@FluxComponent
export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            localeNav               : formatLocale(navigator.language),
            boardKey                : '',
            addForm                 : true,
            _notificationSystem     : null
        };

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
        this.connectStore( ErrorStore,              'errorStore' );
        Actions.showAddForm.listen( this._showAddForm.bind( this ) );
        NotifsActions.pushNotif.listen ( this._pushNotif.bind( this ) );
    }

    _pushNotif( notif ){
        this._notificationSystem.addNotification( notif );
    }

    componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
    }

    _showAddForm(){
        this.setState({
            addForm : !this.state.addForm
        });
    }

    handleLanguageChange(language){
        this.setState({
            localeNav : language
        })
    }

    render() {
        const { currentUser }                   = this.state.authStore;
        const { boards, _boardWithoutFilter }   = this.state.boardManagerStore;
        const { error }                         = this.state.errorStore;
        //let localeNav = formatLocale(navigator.language);

        const lightMuiTheme = getMuiTheme(lightBaseTheme);

        const styleNotif = {
          NotificationItem: { // Override the notification item
            DefaultStyle: { // Applied to every notification, regardless of the notification level
              fontFamily : 'sans-serif'
            }
          }
        }

        //this.props.children or render home
        //Because of react-router app is the home
        //and we don't want to render the boardList on /about
        return (
            <IntlProvider locale={this.state.localeNav} messages={getLocalMessage(this.state.localeNav)}>
                <MuiThemeProvider muiTheme={lightMuiTheme}>
                    <div>
                        <HeaderApp onLanguageChange = {this.handleLanguageChange.bind(this)} addForm={this.state.addForm} />
                        <NotificationSystem ref="notificationSystem" style = { styleNotif }/>
                        {this.props.children ||
                        <div>
                            {_boardWithoutFilter.length !== 0 ? <BoardListView boards = {boards}/> :  <AppLoader/>}
                            {_boardWithoutFilter.length !== 0 && boards.length === 0 ? <NoBoardFound/> : null}
                        </div>
                        }
                    </div>
                </MuiThemeProvider>
            </IntlProvider>
        );
    }
}
