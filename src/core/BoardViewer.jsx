import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';
import SearchBoard              from 'core/SearchBoard'

export default class BoardViewer extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        return(
            <SearchBoard />
            <BoardTable boards={this.props.boards} />
        )

    }


}
