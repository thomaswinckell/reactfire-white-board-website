import { Store }        from 'airflux';
import Firebase         from 'firebase';

import { firebaseUrl }  from 'config/AppConfig';
import AuthStore        from 'core/AuthStore';
import * as Actions     from './BoardManagerActions';

class BoardManagerStore extends Store {

    constructor() {
        super();
        this.boardsRef = new Firebase( `${firebaseUrl}/boards` );

        this._boardWithoutFilter = []

        this.state = {
            boards : []
        };

        this.listenTo( AuthStore, this._onAuthSuccess.bind( this ) );
        Actions.addBoard.listen( this._addBoard.bind( this ) );
        Actions.deleteBoard.listen( this._deleteBoard.bind( this ) );
        Actions.filterText.listen( this._filterText.bind( this ) );
        Actions.boardExist.listen( this._boardExist.bind( this ) );
    }

    get size() { return this.state.size; }

    destroy() {
        this.boardsRef.off();
    }

    /**
     * called when user successfully logged to bind events to the Firebase listener
     */
    _onAuthSuccess() {
        this.boardsRef.off();
        this._boardWithoutFilter = [];
        this.boardsRef.on( 'child_added', this._onAddBoard.bind( this ), this._onError.bind( this ) );
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
        this._boardWithoutFilter.push( { key : dataSnapshot.key(), val : dataSnapshot.val() } );
        this.reload();
    }

    _onDeleteBoard( oldDataSnapshot ) {
        const boardKey = oldDataSnapshot.key();
        _.remove( this._boardWithoutFilter, w => { return w.key === boardKey; } );
        this.reload();
    }

    //TODO
    _onError( error ){
        console.log(error);
    }

    /*
        Called when a user try to access a boardKey
     */
    _boardExist( boardKey ){
        this.boardsRef.child( boardKey ).once('value', exist =>{
            if(exist.val() === null){
                Actions.returnBoardExist( false );
            } else {
                Actions.returnBoardExist( true );
            }
        });
    }

    reload(){
        this.state.boards = this._boardWithoutFilter;
        this.publishState();
    }

    _filterText( filterText_ ){
        let filterText = filterText_;
        this.state.boards = this._boardWithoutFilter.filter( board => {
            return board.val.name.toUpperCase().includes( filterText.toUpperCase() ) ||
            board.val.description.toUpperCase().includes( filterText.toUpperCase() )
        })
        this.publishState();
    }

    /**
     * called when currentUser add a new board
     * save the board in Firebase
     * @param {board} board The new board to add into Firebase
     */
   _addBoard( board ) {
       console.log(board);
      this.boardsRef.push( board )
      .then((response) => {
         console.log(response);
      })
      .catch((error) => {
         console.log(error);
      });
   }

    _deleteBoard( boardKey ) {
        let boardBase = new Firebase( `${firebaseUrl}/boards/${boardKey}` );
        boardBase.remove();
        boardBase.off();
    }

}

export default new BoardManagerStore();
