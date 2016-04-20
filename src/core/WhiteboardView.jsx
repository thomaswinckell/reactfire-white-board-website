import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import WhiteBoard               from 'whiteboard';
import { firebaseUrl }          from 'config/AppConfig';

export default class WhiteboardView  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){
        //
        console.log(this.props);
       return(
           <div>
               <WhiteBoard firebaseUrl={firebaseUrl} boardKey={this.props.params.boardKey}/>
           </div>
        )
    }
}
