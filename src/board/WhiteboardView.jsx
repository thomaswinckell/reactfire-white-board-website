import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import WhiteBoard               from 'whiteboard';
import { firebaseUrl , gmapsApiKey }          from 'config/AppConfig';

import AppLoader                from 'core/AppLoader';
import RaisedButton             from 'material-ui/RaisedButton';
import BackSpace                from 'material-ui/svg-icons/hardware/keyboard-backspace';

import BoardManagerStore        from './BoardManagerStore';
import * as Actions             from './BoardManagerActions';
import * as NotifsActions       from 'core/NotifsActions';
import { browserHistory }       from 'react-router';

export default class WhiteboardView  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            exist : false
        };
    }

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

    render(){

        const styleGoBackButton = {
            zIndex      : '144000',
            position    : 'fixed',
            top         : '0%',
            left        : '48%'
        }

        return(
           <div>
               <RaisedButton style = { styleGoBackButton } onClick = { () => { browserHistory.goBack() } } label='Go Back' icon={ <BackSpace/> } />
               {this.state.exist === true ? <WhiteBoard firebaseUrl={firebaseUrl} boardKey={this.props.params.boardKey} gmapsApiKey={gmapsApiKey}/> : <AppLoader/> }
           </div>
        )
    }
}
