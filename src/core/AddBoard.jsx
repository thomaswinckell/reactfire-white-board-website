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
        //this.handleNameChange         = this.handleNameChange.bind(this);
        //this.handleUrlChange          = this.handleUrlChange.bind(this);
        //this.handleDescriptionChange  = this.hanhandleDescriptionChangedleNameChange.bind(this);
    }

    handleNameChange(e){
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

    /**
     * called when submiting a new board
     No validations are made
     refresh the form and send the data to BoardManager.jsx
     * @param  {Event} e
     */
    handleSubmit(e){
        e.preventDefault();
        var name = this.state.name.trim();
        var urlLink = this.state.urlLink.trim();
        var description = this.state.description.trim();

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
        return this.renderForm();
    }

    /**
     * Maybe create a new component??
    */
    renderForm(){

        var formStyle = {
            marginLeft : '5%',
            textAlign : 'center'
        }

        return(
            <form className="AddBoard" onSubmit = {this.handleSubmit.bind(this)} style={formStyle}>
                <input type="text" placeholder="Name of the board"
                    value={this.state.name}
                    onChange={this.handleNameChange.bind(this)}/>
                <input type="text" placeholder="URL  link of the board"
                    value={this.state.urlLink}
                    onChange={this.handleUrlChange.bind(this)} />
                <input type="text" placeholder="Description of this board"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange.bind(this)}/>
                <input type="submit" value="Post" />
            </form>
        );
    }

}
