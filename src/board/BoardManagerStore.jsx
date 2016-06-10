import { Store }        from 'airflux';
import Firebase         from 'firebase';
import * as NotifsActions from 'core/NotifsActions';
import { firebaseUrl }  from 'config/AppConfig';
import AuthStore        from 'core/AuthStore';
import * as Actions     from './BoardManagerActions';


/**
 * Board Store
 * Manage the list of boards
 */
class BoardManagerStore extends Store {

    constructor() {
        super();
        // this.boardsRef = new Firebase( `${firebaseUrl}/boards` );
        this.boardsRef = firebase.database().ref('boards');

        /**
         * boards -- the list of board to displayName (can be filtered or equal to boardWithoutFiler)
         * boardWithoutFiler -- the full list of boards
         */
        this.state = {
            boards : [],
            _boardWithoutFilter : []
        };

        this.listenTo( AuthStore, this._onAuthSuccess.bind( this ) );
        Actions.addBoard.listen( this._addBoard.bind( this ) );
        Actions.deleteBoard.listen( this._deleteBoard.bind( this ) );
        Actions.filterText.listen( this._filterText.bind( this ) );
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
        this.state._boardWithoutFilter = [];
        this.boardsRef.on( 'child_added', this._onAddBoard.bind( this ), this._onError.bind( this ) );
        this.boardsRef.on( 'child_removed', this._onDeleteBoard.bind( this ) );
    }

    /**
     * Called when a new board is added to Firebase
     * add the board to the state then publishState is called to emit an event
     * to App.jsx to refresh his render()
     * @param  {[type]} dataSnapshot The new board added
    */
    _onAddBoard( dataSnapshot ) {
        this.state._boardWithoutFilter.push( { key : dataSnapshot.key(), val : dataSnapshot.val() } );
        this.reload();
    }

    _onDeleteBoard( oldDataSnapshot ) {
        const boardKey = oldDataSnapshot.key();
        _.remove( this.state._boardWithoutFilter, w => { return w.key === boardKey; } );
        this.reload();
    }

    _onError( error ){
        NotifsActions.pushNotif({
            titleKey    : 'Error',
            messageKey  : 'ErrorMessage',
            title       : error.code ?  error.code : null,
            message     : error.message ? error.message : null,
            level       : 'error',
            autoDismiss : 10,
            position    : 'br'
        });
    }

    /**
     * publishState of the store -- called when the list of boards is modified
     * @return {[type]} [description]
     */
    reload(){
        this.state.boards = this.state._boardWithoutFilter;
        this.publishState();
    }

    /**
     * Filter the boardList
     * @param  {String} filterText_ the pattern we're looking for in our boards
     * @return publish the state of the store with the filtered board list
     */
    _filterText( filterText_ ){
        let filterText = filterText_;
        this.state.boards = this.state._boardWithoutFilter.filter( board => {
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
      this.boardsRef.push( board )
      .then((response) => {
          NotifsActions.pushNotif({
              titleKey    : 'Success',
              messageKey  : 'SuccessBoardAdded',
              level       : 'success',
              autoDismiss : 10,
              position    : 'br'
          });
      })
      .catch((error) => {
          NotifsActions.pushNotif({
              titleKey    : 'Error',
              messageKey  : 'ErrorMessage',
              title       : error.code ?  error.code : null,
              message     : error.message ? error.message : null,
              level       : 'error',
              autoDismiss : 10,
              position    : 'br'
          });
      });
   }

   //delete a board then send a notif
    _deleteBoard( boardKey ) {
        let boardBase = new Firebase( `${firebaseUrl}/boards/${boardKey}` );
        boardBase.remove()
        .then( () => {
            NotifsActions.pushNotif({
                titleKey    : 'Success',
                messageKey  : 'SuccessBoardDeleted',
                level       : 'success',
                autoDismiss : 10,
                position    : 'br'
            });
        });
        boardBase.off();
    }

}

export default new BoardManagerStore();
