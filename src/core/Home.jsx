import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import Firebase                 from 'firebase';

import { firebaseUrl }          from 'config/AppConfig';

import AuthStore                from 'core/AuthStore';
import AppLoader                from 'core/AppLoader';
import BoardListView            from 'board/BoardListView';
import BoardManagerStore        from 'board/BoardManagerStore';
import AddBoard                 from 'board/AddBoard';


@FluxComponent
export default class Home extends Component {

    constructor( props ) {
        super( props );
        this.state = {};

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
    }

    render() {
        const { currentUser }                   = this.state.authStore;
        const { boards, _boardWithoutFilter }   = this.state.boardManagerStore;

        return (
            <div>
                <AddBoard/>
                {_boardWithoutFilter.length !== 0 ? <BoardListView boards = {boards}/> :  <AppLoader/>}
                {_boardWithoutFilter.length !== 0 && boards.length === 0 ? <NoBoardFound/> : null}
            </div>
        );
    }
}
