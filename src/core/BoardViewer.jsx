import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';


export default class BoardViewer extends Component  {

    constructor() {
        this.state = {};
    }

    render(){

        return(
            <p>
                {this.props.boards}
            </p>
        )

    }


}
