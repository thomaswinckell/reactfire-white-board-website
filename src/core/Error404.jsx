import React, { Component }     from 'react';

import Styles                   from './Error404.scss';

export default class Error404 extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 className={ Styles.banner }> <span className={ Styles.squareBracket }> [ </span> Error 404  <span className={ Styles.squareBracket }> ] </span> </h1>
                <div className= { Styles.message }>
                    <h5>
                        We're sorry, but the page you're looking for can't be found
                    </h5>
                    <p>
                        You might try searching our site, or starting at our home page
                    </p>
                    <br/>
                    <h3> ¯\_(ツ)_/¯ </h3>
                </div>
            </div>
        );
    }
}
