import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardPreview             from 'core/BoardPreview';


export default class BoardListView extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        var rows = [];
        this.props.boards.forEach(function(board) {
            rows.push(
                <BoardPreview board={board} key={board.key} />
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
