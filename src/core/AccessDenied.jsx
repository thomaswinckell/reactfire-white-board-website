import React, { Component }     from 'react';

import HeaderApp                from 'core/HeaderApp';

export default class AccessDenied extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render() {
        return (
            <div>
                <HeaderApp />
                <h1> ACCESS DENIED </h1>
            </div>
        );
    }
}
