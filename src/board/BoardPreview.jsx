import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions';

import { firebaseUrl }          from 'config/AppConfig';
import Firebase                 from 'firebase';

import Card                     from 'material-ui/lib/card/card';
import CardActions              from 'material-ui/lib/card/card-actions';
import CardHeader               from 'material-ui/lib/card/card-header';
import CardMedia                from 'material-ui/lib/card/card-media';
import CardTitle                from 'material-ui/lib/card/card-title';
import IconButton               from 'material-ui/lib/icon-button';
import CardText                 from 'material-ui/lib/card/card-text';
import FontIcon                 from 'material-ui/lib/font-icon';
import Badge                    from 'material-ui/lib/badge';
import ActionDelete             from 'material-ui/lib/svg-icons/action/delete';
import ActionAspectRatio        from 'material-ui/lib/svg-icons/action/aspect-ratio';
import PersonOnlineIcon         from 'material-ui/lib/svg-icons/social/person-outline';
import defaultBG                from 'images/defaultBackgroundImage.jpg';

import {Link}                   from 'react-router';

export default class BoardPreview  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            presence : 0
        };

        this.connectedRef = new Firebase( `${firebaseUrl}/presence/${this.props.board.key}` );
        this.connectedRef.on("value", (snap) => {
            this.setState({
                presence : snap.numChildren()
            });
        });

        this.handleChangeGoTo   = this.handleChangeGoTo.bind(this);
        this.handleChangeDelete = this.handleChangeDelete.bind(this);

    }

    componentWillUnmount(){
        this.connectedRef.off();
    }


    handleChangeDelete(){
        if(confirm('are you sure?')){
            Actions.deleteBoard(this.props.board.key);
        }
    }

    handleChangeGoTo(){
        Actions.showBoard(this.props.board.key);
    }

    render(){

        const board = this.props.board.val;

        let cardHeader = {
            fontSize: '200%'
        }

        return(
            <Card>
                <CardHeader title={board.name} titleStyle={cardHeader}>
                    <Badge badgeContent={this.state.presence} primary={true} style= {{ float : 'right'}}>
                        <PersonOnlineIcon />
                    </Badge>
                </CardHeader>
                <CardMedia overlay={<CardTitle title={board.name} subtitle={board.description} />}>
                    <img src={board.backgroundImage? board.backgroundImage : defaultBG} style={{height : 'inherit'}} />
                </CardMedia>
                <CardActions>
                    <IconButton onClick={this.handleChangeDelete}>
                        <ActionDelete />
                    </IconButton>
                    <Link to={`/boards/${this.props.board.key}`}>
                        <IconButton onClick={this.handleChangeGoTo}>
                            <ActionAspectRatio />
                        </IconButton>
                    </Link>
                </CardActions>
           </Card>
        )
    }
}
