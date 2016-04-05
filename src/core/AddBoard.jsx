import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import ReactDOM                 from 'react-dom';


export default class AddBoard extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            name: '',
            urlLink: '',
            description: ''
        };
    }

    handleNameChange(e){
        console.log(this);
        this.setState({
            name : e.target.value
        });
    }

    handleUrlChange(e){
        this.setState({
            urlLink : e.target.value
        });
    }

    handleDescriptionChange(e){
        this.setState({
            description : e.target.value
        });
    }


    handleSubmit(e){
        e.preventDefault();
        var name = this.state.name.trim();
        var urlLink = this.state.urlLink.trim();
        var description = this.state.description.trim();

        //If one field is empty then do nothing
        if(!name || !urlLink || description){
            return;
        }

        console.log('callibf onBoardSubmit');

        this.props.onBoardSubmit({
            name : name,
            urlLink: urlLink,
            description: description
        });

        this.setState({
            name: '',
            urlLink: '',
            description: ''
        })


    }

    render(){

        return(
            <form className="commentForm" onSubmit = {this.handleSubmit}>
                <input type="text" placeholder="Name of the board"
                    value={this.state.name}
                    onChange={this.handleNameChange}/>
                <input type="text" placeholder="URL  link of the board"
                    value={this.state.urlLink}
                    onChange={this.handleUrlChange} />
                <input type="text" placeholder="Description of this board"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}/>
                <input type="submit" value="Post" />
            </form>
        )

    }


}
