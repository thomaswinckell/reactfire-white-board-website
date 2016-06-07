import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

export default class NoBoardFound  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};

    }

    componentDidMount(){
    }

    render(){

        return(
            <h3> No board Found ! </h3>
        )
    }
}
