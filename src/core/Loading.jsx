import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import HeaderApp                from 'core/HeaderApp';

export default class Loading extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render() {
        return (
            <div>
                <HeaderApp />
                <span>Loading...</span>
            </div>
        );
    }
}
