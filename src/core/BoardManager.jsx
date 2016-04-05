import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardViewer              from 'core/BoardViewer';


export default class BoardManager extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        var BOARDS = [
            {name: 'board un', url: 'http://board.winckell.com/', description: 'Ouah ceci un board'},
            {name: 'board deux', url: 'http://board.winckell.com/', description: 'Ouah ceci un board'}
        ];

        return(
            <BoardViewer boards={BOARDS} />

        )

    }


}
