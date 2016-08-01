import React,
       { Component, PropTypes } from 'react';

import WhiteBoard, {
    Elements
}                                from 'reactfire-white-board';
import { firebaseUrl , gmapsApiKey }          from 'config/AppConfig';

import AppLoader                from 'core/AppLoader';
import FlatButton               from 'material-ui/FlatButton';
import BackSpace                from 'material-ui/svg-icons/hardware/keyboard-backspace';

import BoardTypes               from '../config/boardType';
import * as Actions             from './BoardManagerActions';
import * as NotifsActions       from 'core/NotifsActions';
import { browserHistory }       from 'react-router';

export default class WhiteboardView  extends Component  {

    static contextTypes = {
        intl : PropTypes.object
    };

    state = {
        exist : false
    };

    /**
     * TODO Update Context to remove HeaderApp when rendering???
     * check if the board exist
     * if not redirect to /boardNotFound
     */
    componentWillMount(){
        Actions.boardExist( this.props.params.boardKey ).then( exist => {
            if ( exist ){
                this.setState( { exist } )
            } else {
                NotifsActions.pushNotif({
                    titleKey    : 'BoardNotFound',
                    messageKey  : 'BoardNotFoundMessage',
                    level       : 'error',
                    autoDismiss : 10,
                    position    : 'br'
                });
                browserHistory.push('/boardNotFound');
            }
        } );
    }

    getElements = () => {
        return BoardTypes.find( boardtype => boardtype.type === this.state.exist).elements;
    };

    render(){

        const locale = this.context.intl.locale;

        const styleGoBackButton = {
            zIndex      : '1440000',
            position    : 'fixed',
            top         : '30px',
            left        : '30px'
        };

         return(
               <div>
                   <FlatButton style={ styleGoBackButton } onClick={ () => { browserHistory.goBack() } } label='Go Back' icon={ <BackSpace/> } backgroundColor="rgba(255,255,255,0.3)"/>
                   {this.state.exist ? <WhiteBoard locale={locale} elements={ this.getElements() } firebaseUrl={firebaseUrl} boardKey={this.props.params.boardKey} gmapsApiKey={gmapsApiKey}/> : <AppLoader/> }
               </div>
         )
    }
}
