import React, { Component }     from 'react';

export default class ErrorAuth extends Component {

    render() {

        console.log(JSON.stringify(this.props.error));
        return (
            <div>
                <h1> Authentication error</h1>
                <p> More info {this.props.error.code}</p>
            </div>
        );
    }
}
