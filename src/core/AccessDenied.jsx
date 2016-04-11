import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

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
