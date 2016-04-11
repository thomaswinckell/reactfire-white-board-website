import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';


export default class BoardSearchBar  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    handleChange(){
        this.props.onUserInput(
            this.refs.filterTextInput.value
        );
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
                      value={this.props.filterText}
                      ref="filterTextInput"
                      onChange={this.handleChange.bind(this)}
                    />
                </form>
            </div>

        )

    }


}
