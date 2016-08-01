import React,
       { Component, PropTypes } from 'react';
import LazyLoad                 from 'react-lazy-load';

import BoardPreview             from './BoardPreview';

import * as Actions             from './BoardManagerActions';


import styles from './BoardListView.scss';

/**
 * Render the list of boards and manage Edit & delete request
 */
export default class BoardListView extends Component  {

    state = {};

    /**
     * Fire an Action to savze modification on a board only if there is differences
     * @param  {board} board    [The board to modify]
     * @param  {object} newState [State with the newValues]
     */
    handleSaveEdit = ( board, newState ) => {
        if( newState.newName !== board.val.name ){
            Actions.saveEdit( board.key, 'name', newState.newName );
        }
        if ( newState.newDescription !== board.val.description ) {
            Actions.saveEdit( board.key, 'description', newState.newDescription );
        }
    };

    /**
     * Fire an action to delete a board
     * @param  {String} boardKey the key of the board to delete
     */
    handleDeleteAction = ( boardKey ) => {
        Actions.deleteBoard( boardKey );
    };

    /**
     * Render a board with lazyloading
     * @param  {board} board [the board to render]
     * @return {JSX}       The board preview wrapped in the lazyLoader
     */
    renderBoard = ( board ) => {
        return (
            <div key={ board.key } className={ styles.board }>
                <LazyLoad offset={ 4000 }>
                    <BoardPreview board={ board }
                        handleDelete={ this.handleDeleteAction }
                        handleSaveEdit={ this.handleSaveEdit }/>
                </LazyLoad>
            </div>
        );
    };

    /**
     * Render all the boards
     * @return {JSX}
     */
    render() {
        return (
            <div className={styles.container}>
                {this.props.boards.map( this.renderBoard )}
            </div>
        );
    }
}
