import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardPreview             from 'core/BoardPreview';
import LazyLoad                 from 'react-lazy-load';

export default class BoardListView extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        var rows = [];
        this.props.boards.map(board => {
            rows.push(
                <div key={board.key}>
                    <LazyLoad offset={4000}>
                        <BoardPreview board={board}/>
                    </LazyLoad>
                </div>
            );
        });
        return (
            <div>
                {rows}
            </div>
        );
    }


}
