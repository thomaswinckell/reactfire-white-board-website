import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import BoardManager             from 'core/BoardManager';
import AuthStore                from 'core/AuthStore';
import BoardManagerStore        from 'core/BoardManagerStore';


@FluxComponent
export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {};

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
    }

    renderLoading() {
        return (
            <span>Loading...</span>
        );
    }


    render() {

        const { currentUser } = this.state.authStore;
        const { boards } = this.state.boardManagerStore;
        /*
        if ( !currentUser ) {
            return this.renderLoading();
        }
        */
        return (
            <div>
                <BoardManager boards = { boards } />
            </div>
        );
    }
}
