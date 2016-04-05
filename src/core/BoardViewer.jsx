import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import BoardSearchBar           from 'core/BoardSearchBar';
import BoardListView            from 'core/BoardListView';

export default class BoardViewer extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        return(
            <div>
                <BoardSearchBar />
                <BoardListView boards={this.props.boards} />
            </div>
    );

    }


}
