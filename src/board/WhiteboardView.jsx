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

export default class WhiteboardView  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            exist : false
        };

        Actions.returnBoardExist.listen( this._returnBoardExist.bind( this ) );

        Actions.boardExist( this.props.params.boardKey );
    }

    _returnBoardExist( exist ){
        if ( exist === false ) {
            ErrorActions.boardKeyNoMatch();
        } else {
            this.setState({ exist })
        }
    }

    render(){
        return(
           <div>
               {this.state.exist === true ? <WhiteBoard firebaseUrl={firebaseUrl} boardKey={this.props.params.boardKey} gmapsApiKey={gmapsApiKey}/> : <AppLoader/> }
           </div>
        )
    }
}
