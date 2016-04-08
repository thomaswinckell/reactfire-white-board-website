import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardPreview             from 'core/BoardPreview';
import LazyLoad                 from 'react-lazy-load';

export default class BoardListView extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        var filterText = this.props.filterText;
        var rows = [];
        this.props.boards.forEach(function(board) {
            //check if the board contain the research field if the field is not empty
            if(
                filterText &&
                ( !board.val.name.toUpperCase().includes(filterText.toUpperCase()) &&
                  !board.val.description.toUpperCase().includes(filterText.toUpperCase()))
            ){
                console.log('Ne contient pas');
                return;
            }
            rows.push(
                <div>
                    <LazyLoad
                        height={290}
                        offset={2000}
                        onContentVisible={() => console.log('{board.val.name}')}>
                        <BoardPreview board={board} key={board.key} />
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
