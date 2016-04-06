import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';


export default class BoardPreview  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        return(
          <tr>
            <td> {this.props.board.name}</td>
            <td> <a href={this.props.board.urlLink}> {this.props.board.urlLink}</a> </td>
            <td> {this.props.board.description}</td>
          </tr>
        )

    }


}
