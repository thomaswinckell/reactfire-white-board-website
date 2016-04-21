import React, { Component }     from 'react';

export default class Error404 extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render() {
        return (
            <div>
                <h1> Error 404 </h1>
                <p>  Ressource not found </p>
            </div>
        );
    }
}
