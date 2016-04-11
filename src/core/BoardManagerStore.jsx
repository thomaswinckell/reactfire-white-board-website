import { Store }        from 'airflux';
import Firebase         from 'firebase';

import { firebaseUrl }  from 'config/AppConfig';
import AuthStore        from './AuthStore';
import * as Actions     from './BoardManagerActions';

class BoardManagerStore extends Store {

    constructor() {
        super();
        this.boardsRef = new Firebase( `${firebaseUrl}/board` );

        this.state = {
            boards : []
        };

        this.listenTo( AuthStore, this._onAuthSuccess.bind( this ) );
        Actions.addBoard.listen( this._addBoard.bind( this ) );
        Actions.deleteBoard.listen( this._deleteBoard.bind( this ) );
    }

    get size() { return this.state.size; }

    destroy() {
        this.boardsRef.off();
    }

    /**
     * called when user successfully logged to bind events to the Firebase listener
     */
    _onAuthSuccess() {
        this.boardsRef.on( 'child_added', this._onAddBoard.bind( this ) );
        this.boardsRef.on( 'child_removed', this._onDeleteBoard.bind( this ) );
    }

    /**
     * Called when a new board is added to Firebase
     * add the board to the state then publisState is called to emit an event
     * to App.jsx to refresh his render()
     * @param  {[type]} dataSnapshot The new board added
    */
    _onAddBoard( dataSnapshot ) {
        let { boards } = this.state;
        boards.push( { key : dataSnapshot.key(), val : dataSnapshot.val() } );
        this.state.boards = boards;
        this.publishState();
    }

    _onDeleteBoard( oldDataSnapshot ) {
        const boardKey = oldDataSnapshot.key();
        let { boards } = this.state;
        _.remove( boards, w => { return w.key === boardKey; } );
        this.state.boards = boards;
        this.publishState();
    }

    /**
     * called when currentUser add a new board
     * save the board in Firebase
     * @param {board} board The new board to add into Firebase
     */
   _addBoard( board ) {
      this.boardsRef.push( board );
   }

    _deleteBoard( boardKey ) {
        let boardBase = new Firebase( `${firebaseUrl}/board/${boardKey}` );
        boardBase.remove();
        boardBase.off();
    }

}

export default new BoardManagerStore();
