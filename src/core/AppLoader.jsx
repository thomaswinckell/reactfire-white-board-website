import React, { Component }     from 'react';

import gifLoader                from 'images/Sfr_loadr_v2.gif';

export default class AppLoader extends Component {

    render() {

        const centerGif = {
            position    : 'absolute',
            textAlign   : 'center',
            top         : '42%',
            left        : '46%'
        };

        return (
                <div style={centerGif}>
                    <img src={ gifLoader } alt='loading'/>
                </div>
        );
    }
}
