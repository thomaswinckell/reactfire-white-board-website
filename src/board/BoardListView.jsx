import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardPreview             from './BoardPreview';
import LazyLoad                 from 'react-lazy-load';

export default class BoardListView extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render(){

        var flexContainer = {
            padding: 0,
            margin: 0,
            display: 'inline-flex',
            alignItems: 'center',
            flexFlow: 'row wrap',
            justifyContent: 'space-around'
        }

        let cardStyle = {
            maxWidth : '800px',
            minWidth : '550px',
            margin : 'auto',
            paddingLeft : '5px',
            paddingTop : '5px'
        }

        var rows = [];
        this.props.boards.map(board => {
            rows.push(
                <div key={board.key} style = {cardStyle}>
                    <LazyLoad offset={4000}>
                        <BoardPreview board={board}/>
                    </LazyLoad>
                </div>
            );
        });
        return (
            <div style={flexContainer}>
                {rows}
            </div>
        );
    }


}
