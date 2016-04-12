import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import BoardManager             from 'core/BoardManager';
import AuthStore                from 'core/AuthStore';
import BoardManagerStore        from 'core/BoardManagerStore';
import HeaderApp                from 'core/HeaderApp';
import Loading                  from 'core/Loading';
import AccessDenied             from 'core/AccessDenied';

import injectTapEventPlugin     from 'react-tap-event-plugin';

injectTapEventPlugin();

@FluxComponent
export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {};

        this.connectStore( AuthStore,               'authStore' );
        this.connectStore( BoardManagerStore,       'boardManagerStore' );
    }


    render() {

        const { currentUser } = this.state.authStore;
        const { boards } = this.state.boardManagerStore;

        //Render Loading screen until data are loaded or user is not logged in
        if ( !currentUser ||  boards.length == 0) {
            return (<Loading/>);
        }

        if(currentUser.denied){
            return (<AccessDenied/>);
        }

        return (
            <div>
                <HeaderApp />
                <BoardManager boards = {boards} />
            </div>
        );
    }
}
