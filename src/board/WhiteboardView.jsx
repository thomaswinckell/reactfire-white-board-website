import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import WhiteBoard               from 'whiteboard';
import { firebaseUrl , gmapsApiKey }          from 'config/AppConfig';

import AppLoader                from 'core/AppLoader';

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

        Actions.returnBoardExist.listen( this._returnBoardExist.bind( this ) );

    }

    componentWillMount(){
        Actions.boardExist( this.props.params.boardKey );
    }

    //TODO SEND NOTIF
    _returnBoardExist( exist ){
        NotifsActions.pushNotif({
            title       : 'Board not found',
            message     : 'It seems this board doesn\'t exist',
            level       : 'error',
            autoDismiss : 10,
            position    : 'br'
        })
        exist ? this.setState({ exist }) : browserHistory.push('/boardNotFound');
    }

    render(){
        return(
           <div>
               {this.state.exist === true ? <WhiteBoard firebaseUrl={firebaseUrl} boardKey={this.props.params.boardKey} gmapsApiKey={gmapsApiKey}/> : <AppLoader/> }
           </div>
        )
    }
}
