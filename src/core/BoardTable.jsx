import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';


export default class BoardTable extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        var rows = [];
        this.props.boards.forEach(function(board) {
            rows.push(
                <tr>
                    <td> {board.name}</td>
                    <td> <a href={board.urlLink}> {board.urlLink}</a> </td>
                    <td> {board.description}</td>
                </tr>
            );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }


}
