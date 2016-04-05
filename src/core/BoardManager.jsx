import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardViewer              from 'BoardViewer';


export default class BoardManager extends Component  {

    constructor() {
        this.state = {};
    }


    var BOARDS = [
        {name: 'board un', url: 'http://board.winckell.com/', description: 'Ouah ceci un board'},
        {name: 'board deux', url: 'http://board.winckell.com/', description: 'Ouah ceci un board'},
    ];

    render(){

        return(
            <p>
                <BoardViewer boards={BOARDS} />
            </p>
        )

    }


}
