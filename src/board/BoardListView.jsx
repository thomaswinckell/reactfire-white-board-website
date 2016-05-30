import React,
       { Component, PropTypes } from 'react';
import LazyLoad                 from 'react-lazy-load';

import BoardPreview             from './BoardPreview';

import styles from './BoardListView.scss';


export default class BoardListView extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    renderBoard( board ) {
        return (
            <div key={ board.key } className={ styles.board }>
                <LazyLoad offset={ 4000 }>
                    <BoardPreview board={ board }/>
                </LazyLoad>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.boards.map( this.renderBoard.bind( this ) )}
            </div>
        );
    }
}
