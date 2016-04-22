import React, { Component }     from 'react';

import HeaderApp                from 'core/HeaderApp';
import Error404                 from './Error404';

export default class ErrorManager extends Component {

    render() {
        return (
            <div>
                {this.props.error.type === 'BoardNotFound' ? <Error404/> : null }
            </div>
        );
    }
}
