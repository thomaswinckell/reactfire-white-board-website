import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import SearchBoard              from 'core/SearchBoard';
import BoardTable               from 'core/BoardTable';

export default class BoardViewer extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        return(
            <div>
                <SearchBoard />
                <BoardTable boards={this.props.boards} />
            </div>
    );

    }


}
