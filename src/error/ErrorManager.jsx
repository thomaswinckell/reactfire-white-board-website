import React, { Component }     from 'react';

import Error404                 from './Error404';
import ErrorAuth                from './ErrorAuth';

export default class ErrorManager extends Component {

    render() {
        
        return (
            <div>
                {this.props.error.type === 'BoardNotFound'  ? <Error404 /> : null }
                {this.props.error.type === 'AuthError'      ? <ErrorAuth error = {this.props.error.err}/> : null }
            </div>
        );
    }
}
