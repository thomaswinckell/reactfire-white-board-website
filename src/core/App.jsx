import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import BoardManager             from 'core/BoardManager';
import AuthStore                from 'core/AuthStore';
import BoardManagerStore        from 'core/BoardManagerStore';
import HeaderApp                from 'core/HeaderApp';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


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
            <div>
                <HeaderApp />
                <span>Loading...</span>
            </div>
        );
    }

    accessDenied(){
        return(
            <div>
                <h1> ACCESS DENIED </h1>
            </div>
        );
    }

    render() {

        const { currentUser } = this.state.authStore;
        const { boards } = this.state.boardManagerStore;

        if ( !currentUser ) {
            return this.renderLoading();
        }

        if( boards.length == 0 ){
            return this.renderLoading();
        }

        if(currentUser.denied){
            return this.accessDenied();
        }

        return (
            <div>
                <HeaderApp />
                <BoardManager boards = { boards } />
            </div>
        );
    }
}
