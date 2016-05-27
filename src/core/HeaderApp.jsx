import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'board/BoardSearchBar';

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
import ContentAdd               from 'material-ui/lib/svg-icons/content/add';
import logosfeir                from 'images/logosfeir.png';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import {Link, IndexLink}        from 'react-router';

import AuthStore                from 'core/AuthStore';
import * as AuthActions         from 'core/AuthActions';

import * as Actions            from 'board/BoardManagerActions';

export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            language : 'en'
        };
    }

    onClickAdd(){
        Actions.showAddForm();
    }

    handleChangeLanguage(event, index, value){
        this.setState({language : value});
        this.props.onLanguageChange(value);
    }

    handleChangeIconMenu(event, value){
        if ( value === 'logout' ){
            AuthActions.logout();
        }
    }

    render(){
        return (
            <Toolbar style = {{ fontFamily : 'sans-serif', backgroundColor : '#e9eef0',  borderBottom: '1px solid rgba(179, 138, 109, 0.11)' }}>
                <ToolbarGroup firstChild={true} float="left" style={{ paddingRight : '20px', paddingLeft : '1%'}}>
                    <IndexLink to="/">
                        <img src = { logosfeir} alt='logosfeir' height='56px'/>
                    </IndexLink>
                </ToolbarGroup>
                <BoardSearchBar />
                <ToolbarGroup float="right">
                    <IconMenu onChange={this.handleChangeIconMenu.bind(this)} iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                        </IconButton>}>
                        <MenuItem>
                            <Link to={'/about'}>about</Link>
                        </MenuItem>
                            {!_.isEmpty(AuthStore.currentUser) ? <MenuItem value= 'logout' primaryText='logout'/> : <MenuItem><Link to={'/login'}> login </Link></MenuItem>}
                    </IconMenu>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <DropDownMenu value={this.state.language} onChange={this.handleChangeLanguage.bind(this)} style = {{ fontWeight: 'bold' }}>
                        <MenuItem value= 'en' primaryText= {<FormattedMessage {...translations.MenuItemEnglish}/>} />
                        <MenuItem value= 'fr' primaryText= {<FormattedMessage {...translations.MenuItemFrench}/>} />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <FormattedMessage {...translations.HeaderAppLabelButton}>
                        {labelButton => (
                            <RaisedButton backgroundColor= {'rgba(241,71,29,0.9)'} label={labelButton} labelPosition= "before" icon={<ContentAdd/>} onClick={this.onClickAdd}/>
                        )}
                    </FormattedMessage>
                    <ToolbarSeparator style={{
                    float           : 'none',
                    marginRight     : '18px',
                    marginLeft      : '18px'
                    }}/>
                </ToolbarGroup>
            </Toolbar>
        )
    }

}
