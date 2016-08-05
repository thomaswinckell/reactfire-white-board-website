import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import AppLoader                from 'core/AppLoader';
import BoardListView            from 'board/BoardListView';
import BoardManagerStore        from 'board/BoardManagerStore';
import NoBoardFound             from 'board/NoBoardFound';
import AddBoard                 from 'board/AddBoard.jsx';

/**
 * Home Component on /
 * render the list of boards and the button to add board
 */
@FluxComponent
export default class Home extends Component {

    constructor( props ) {
        super( props );
        this.state = {};

        this.connectStore( BoardManagerStore,       'boardManagerStore' );
    }

    render() {
        const { boards, _boardWithoutFilter }   = this.state.boardManagerStore;

        const position = {
            position    : 'fixed',
            bottom      : '2em',
            right       : '2%',
            zIndex      : 200
        };

        return (
            <div>
                {_boardWithoutFilter.length !== 0 ? <AddBoard position={ position }/> : null}
                {_boardWithoutFilter.length !== 0 ? <BoardListView boards = {boards}/> :  <AppLoader/>}
                {_boardWithoutFilter.length !== 0 && boards.length === 0 ? <NoBoardFound/> : null}
            </div>
        );
    }
}
