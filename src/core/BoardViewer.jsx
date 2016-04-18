import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardListView            from 'core/BoardListView';

export default class BoardViewer extends Component  {

    /**
     * Render the search bar and the Listviewer
     * @return {[type]} [description]
     */
    render(){

        return(
            <BoardListView boards={this.props.boards}/>
    );

    }


}
