import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'core/BoardSearchBar';
import AppBar from 'material-ui/lib/app-bar';

export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render(){

        var centerTitle = {
            textAlign: 'center'
        }


        return (
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            >
                <BoardSearchBar/>
            </AppBar>
        )
    }

}
