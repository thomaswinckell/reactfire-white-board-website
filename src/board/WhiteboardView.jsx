import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import WhiteBoard               from 'whiteboard';
import { firebaseUrl , gmapsApiKey }          from 'config/AppConfig';

import AppLoader                from 'core/AppLoader';
import FlatButton               from 'material-ui/FlatButton';
import BackSpace                from 'material-ui/svg-icons/hardware/keyboard-backspace';

import BoardManagerStore        from './BoardManagerStore';
import * as Actions             from './BoardManagerActions';
import * as ErrorActions        from 'error/ErrorActions';
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
        return(
           <div style = { { textAlign : 'center' } }>
               <FlatButton style = {{ zIndex : '144' }} onClick = { () => { browserHistory.goBack() } } label='Go Back' icon={ <BackSpace/> } />
               {this.state.exist === true ? <WhiteBoard firebaseUrl={firebaseUrl} boardKey={this.props.params.boardKey} gmapsApiKey={gmapsApiKey}/> : <AppLoader/> }
           </div>
        )
    }
}
