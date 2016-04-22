import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import HeaderApp                from 'core/HeaderApp';

import Styles                   from './About.scss';

export default class About  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            value: ''
        };
    }

    render(){
        console.log(Styles);
       return(
           <div>
               <HeaderApp/>
               <h3 className={Styles.title}> About us</h3>
               <h5 className={Styles.changelog}>
                   Changelog :
               </h5>
               <ul className={Styles.luChangelog}> Wednesday
                    <li > up2date i18n </li>
                    <li> improve style </li>
                    <li> change language works </li>
               </ul>
           </div>
        )
    }
}
