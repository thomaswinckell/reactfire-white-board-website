import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';


export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render(){

        return(
            <h4> Gestion de Board </h4>
        )
    }

}
