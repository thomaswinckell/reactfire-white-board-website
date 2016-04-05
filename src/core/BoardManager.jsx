import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardViewer              from 'core/BoardViewer';
import AddBoard                 from 'core/AddBoard';

export default class BoardManager extends Component  {

    constructor( props ) {
        super( props );

        var BOARDS = [
            {name: 'board un', urlLink: 'http://board.winckell.com/', description: 'Ouah ceci un board'},
            {name: 'board deux', urlLink: 'http://board.winckell.com/', description: 'Ouah ceci un board'}
        ];

        this.state = {
            boardList : BOARDS
        };


    }

    handleBoardSubmit(board){
        console.log('handleBoardSubmit on BM');
        var newBoard = this.state.boardList.concat([board]);
        this.setState({boardList: newBoard});
    }

    render(){
    
        //Had to bind this to the event see
        //http://stackoverflow.com/questions/29577977/react-ref-and-setstate-not-working-with-es6
        return(
            <div>
                <AddBoard onBoardSubmit={this.handleBoardSubmit.bind(this)}/>
                <BoardViewer boards={this.state.boardList} />
            </div>
        )

    }


}
