import React, { Component }     from 'react';
import { FluxComponent }        from 'airflux';

import gifLoader                from 'images/loading_spinner.gif'

//var loader = new Image();
//loader.src = 'src/gif/loading_spinner.gif';

export default class AppLoader extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render() {

        var centerGif = {
            textAlign: 'center'
        }

        return (
                <div style={centerGif}>
                    <img src={ gifLoader } alt='loading' />
                </div>
        );
    }
}
