import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import HeaderApp                from 'core/HeaderApp';


//var loader = new Image();
//loader.src = 'src/gif/loading_spinner.gif';

export default class Loading extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render() {

        var centerGif = {
            textAlign: 'center'
        }

        return (
            <div>
                <HeaderApp />
                <div style={centerGif}>
                    <img src={ require('../gif/loading_spinner.gif' ) } alt='loading' />
                </div>
            </div>
        );
    }
}
