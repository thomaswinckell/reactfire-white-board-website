import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

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

    /**
     * Emit an event 'addBoard' to the boardManagerStore
     * @param  {[board]} board
     */
    handleBoardSubmit(board){
        Actions.addBoard(board);
    }

    /**
     * render the form to add a board and the list of boards
     * @return AddBoard and BoardViewer
     */
    render(){
        return(
            <div>
                <AddBoard onBoardSubmit={this.handleBoardSubmit.bind(this)}/>
                <BoardViewer boards={this.props.boards} />
            </div>
        )

    }


}
