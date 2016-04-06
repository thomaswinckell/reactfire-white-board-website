import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';

import * as actions             from 'core/BoardManagerActions';
import BoardViewer              from 'core/BoardViewer';
import AddBoard                 from 'core/AddBoard';
import BoardManagerStore        from 'core/BoardManagerStore';
import * as Actions             from 'core/BoardManagerActions';

export default class BoardManager extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    handleBoardSubmit(board){
        console.log('handleBoardSubmit on BM');
        //var newBoard = this.state.boardList.concat([board]);
        //this.setState({boardList: newBoard});
        Actions.addBoard(board);
    }

    render(){

        //Had to bind this to the event see
        //http://stackoverflow.com/questions/29577977/react-ref-and-setstate-not-working-with-es6
        return(
            <div>
                <AddBoard onBoardSubmit={this.handleBoardSubmit.bind(this)}/>
                <BoardViewer boards={this.props.boards} />
            </div>
        )

    }


}
