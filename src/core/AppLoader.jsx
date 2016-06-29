import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import gifLoader                from 'images/Sfr_loadr_v2.gif'

//var loader = new Image();
//loader.src = 'src/gif/loading_spinner.gif';

export default class AppLoader extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {

        const centerGif = {
            position    : 'absolute',
            textAlign   : 'center',
            top         : '42%',
            left        : '46%'
        }

        return (
                <div style={centerGif}>
                    <img src={ gifLoader } alt='loading'/>
                </div>
        );
    }
}
