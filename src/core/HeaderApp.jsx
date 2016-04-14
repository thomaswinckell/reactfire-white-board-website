import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'core/BoardSearchBar';
import Toolbar                  from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle             from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup             from 'material-ui/lib/toolbar/toolbar-group';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render(){
//<ToolbarTitle text={<FormattedMessage {...translations.HeaderAppTitle}/>} />


        return (
            <Toolbar>
                <FormattedMessage {...translations.HeaderAppTitle}>
                {titleApp => (
                    <ToolbarTitle text={titleApp} />
                )}
                </FormattedMessage>
                <toolbarGroup>
                    <BoardSearchBar/>
                </toolbarGroup>
            </Toolbar>
        )
    }

}
