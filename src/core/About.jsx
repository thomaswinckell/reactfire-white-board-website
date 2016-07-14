import React,
       { Component, PropTypes } from 'react';
import classNames               from 'classnames';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import * as Styles                   from './About.scss';

export default class About  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            value: ''
        };
    }

    render(){
       return(
           <div>
               <h3 className={Styles.title}>  <span className={ Styles.squareBracket }> [ </span> ABOUT US  <span className={ Styles.squareBracket }> ] </span>  </h3>
               <div className={Styles.content}>
                   <h5 className={ Styles.descriptionTitle }>
                       <FormattedMessage { ...translations.aboutUsFollowUs }/>
                   </h5>
                   <ul className= { Styles.socialMedia }>
                       <li>
                           <a href='https://www.facebook.com/SFEIR-474360659323856'>
                               <i className={ classNames( 'fa', 'fa-facebook-official' , 'fa-4x') }></i></a>
                       </li>
                        <li>
                            <a href='https://twitter.com/sfeir'>
                                <i className={ classNames( 'fa', 'fa-twitter', 'fa-4x') }></i></a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com/company/25906'>
                                <i className={ classNames( 'fa', 'fa-linkedin', 'fa-4x') }></i></a>
                        </li>
                        <li>
                            <a href='https://github.com/thomaswinckell/reactfire-white-board-website'>
                                <i className={ classNames( 'fa', 'fa-github', 'fa-4x') }></i></a>
                        </li>
                    </ul>
               </div>
           </div>
        )
    }
}
