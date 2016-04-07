import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import * as Actions             from 'core/BoardManagerActions';

export default class BoardPreview  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    handleChange(){
        Actions.deleteBoard(this.props.board.key);
    }

    render(){

        var board = this.props.board.val;

        return(
          <tr>
            <td> {board.name}</td>
            <td> <a href={board.urlLink}> {board.urlLink}</a> </td>
            <td> {board.description}</td>
            <td>
                <label for={board.key}> supprimer
                </label>
                <input
                    id={board.key}
                    type="checkbox"
                    onChange={this.handleChange.bind(this)}
                    />
            </td>
          </tr>
        )

    }


}
