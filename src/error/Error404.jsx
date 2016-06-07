import React, { Component }     from 'react';

export default class Error404 extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render() {
        return (
            <div>
                <h1 style={{textAlign : 'center'}}> Error 404 </h1>
                {this.props.boardNotFound ? <p>  Ressource not found </p> : null}
            </div>
        );
    }
}
