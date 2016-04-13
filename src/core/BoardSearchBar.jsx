import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions'

export default class BoardSearchBar  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    handleChange(){
        Actions.filterText(this.refs.filterTextInput.value);
    }

    render(){

        var searchStyle = {
            marginLeft : '5%',
            textAlign : 'center'
        }

        return(
            <div style={searchStyle}>
                <form>
                    <input
                      type="text"
                      placeholder="Search..."
                      ref="filterTextInput"
                      onChange={this.handleChange.bind(this)}
                    />
                </form>
            </div>

        )

    }


}
