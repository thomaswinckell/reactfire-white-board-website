import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import * as Actions             from './BoardManagerActions';

import { firebaseUrl }          from 'config/AppConfig';
import Firebase                 from 'firebase';

import Card                     from 'material-ui/Card/Card';
import CardActions              from 'material-ui/Card/CardActions';
import CardHeader               from 'material-ui/Card/CardHeader';
import CardMedia                from 'material-ui/Card/CardMedia';
import CardTitle                from 'material-ui/Card/CardTitle';
import IconButton               from 'material-ui/IconButton';
import CardText                 from 'material-ui/Card/CardText';
import FontIcon                 from 'material-ui/FontIcon';
import Badge                    from 'material-ui/Badge';
import ActionDelete             from 'material-ui/svg-icons/action/delete';
import ActionAspectRatio        from 'material-ui/svg-icons/action/aspect-ratio';
import PersonOnlineIcon         from 'material-ui/svg-icons/social/person-outline';
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
