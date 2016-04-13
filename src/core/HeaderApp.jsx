import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
       
export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render(){

        var centerTitle = {
            textAlign: 'center'
        }


        return(
            <h4 style={centerTitle}> Gestion de Board </h4>
        )
    }

}
