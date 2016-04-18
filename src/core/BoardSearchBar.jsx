import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions'

import TextField                from 'material-ui/lib/text-field';

export default class BoardSearchBar  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            value: ''
        };
    }

    handleChange(event){
        this.setState({
            value : event.target.value
        })
        Actions.filterText( event.target.value );
    }

    render(){

       return(
            <TextField placeholder="Search..." value={this.state.value} onChange={this.handleChange.bind(this)}/>
        )

    }


}
