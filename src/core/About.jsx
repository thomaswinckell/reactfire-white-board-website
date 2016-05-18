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
               <h3  className={Styles.title}> About us</h3>
               <div className={Styles.content}>
                   <h5 className={Styles.title}> WhiteBoard Website </h5>
                   <p className={Styles.description}>
                        This application is used by Sfeir to manage WhiteBoard for internal projects
                        <br/>
                        The module/application WhiteBoard was developed by Thomas Winckell during a internal contest of 8months
                        <br/>
                        Thomas Brillard during his internship did this website to manage those WhiteBoards
                        <br/>
                        I should have used some Lorem ipsum I'm not good for this blabla bullshit :-)
                   </p>
               </div>
           </div>
        )
    }
}
