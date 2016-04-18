import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'core/BoardSearchBar';
import Toolbar                  from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle             from 'material-ui/lib/toolbar/toolbar-title';
import ToolbarGroup             from 'material-ui/lib/toolbar/toolbar-group';
import MenuItem                 from 'material-ui/lib/menus/menu-item';
import DropDownMenu             from 'material-ui/lib/DropDownMenu';
import RaisedButton             from 'material-ui/lib/raised-button';
import IconMenu                 from 'material-ui/lib/menus/icon-menu';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import IconButton               from 'material-ui/lib/icon-button';
import ToolbarSeparator         from 'material-ui/lib/toolbar/toolbar-separator';
import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {};
    }


    render(){
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <FormattedMessage {...translations.HeaderAppTitle}>
                    {titleApp => (
                        <ToolbarTitle text={titleApp} />
                    )}
                    </FormattedMessage>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <BoardSearchBar/>
                    <IconMenu iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                        </IconButton>}>
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                    <RaisedButton label="Create Board" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        )
    }

}
