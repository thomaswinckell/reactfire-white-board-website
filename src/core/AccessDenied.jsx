import React, { Component }     from 'react';

import HeaderApp                from 'core/HeaderApp';

export default class AccessDenied extends Component {

    render() {
        return (
            <div>
                <HeaderApp />
                <h1> ACCESS DENIED </h1>
            </div>
        );
    }
}
