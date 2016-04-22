import React, { Component }     from 'react';

import HeaderApp                from 'core/HeaderApp';
import Error404                 from './Error404';
import ErrorAuth                from './ErrorAuth';

export default class ErrorManager extends Component {

    render() {
        console.log('this.props.error.err');
        console.log(this.props.error.err);
        return (
            <div>
                {this.props.error.type === 'BoardNotFound'  ? <Error404 /> : null }
                {this.props.error.type === 'AuthError'      ? <ErrorAuth error = {this.props.error.err}/> : null }
            </div>
        );
    }
}
