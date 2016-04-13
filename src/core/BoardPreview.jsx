import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from 'core/BoardManagerActions';

import Card                     from 'material-ui/lib/card/card';
import CardActions              from 'material-ui/lib/card/card-actions';
import CardHeader               from 'material-ui/lib/card/card-header';
import CardMedia                from 'material-ui/lib/card/card-media';
import CardTitle                from 'material-ui/lib/card/card-title';
import FlatButton               from 'material-ui/lib/flat-button';
import CardText                 from 'material-ui/lib/card/card-text';
import FontIcon                 from 'material-ui/lib/font-icon';
import ActionDelete             from 'material-ui/lib/svg-icons/action/delete';


export default class BoardPreview  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    handleChange(){
        Actions.deleteBoard(this.props.board.key);
    }

    render(){

        var board = this.props.board.val;

        var cardStyle = {
            marginLeft : '20%',
            width : '60%',
            height : 350
        }

        return(
            <Card style={cardStyle}>
                <CardHeader title={board.name} />
                <CardTitle  title={board.name} />
                <CardText>
                    <a href={board.urlLink}> {board.urlLink} </a>
                    <br/>
                    {board.description}
                </CardText>
                <CardActions>
                    <FlatButton icon={<ActionDelete />} onClick={this.handleChange.bind(this)} />
                </CardActions>
           </Card>
        )
    }
}
