import _                        from 'lodash';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'board/BoardSearchBar';

import Toolbar                  from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup             from 'material-ui/Toolbar/ToolbarGroup';
import MenuItem                 from 'material-ui/MenuItem';
import DropDownMenu             from 'material-ui/DropDownMenu';
import FlatButton               from 'material-ui/FlatButton';
import logosfeir                from 'images/logosfeir.png';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import {browserHistory, IndexLink}        from 'react-router';

import AuthStore                from 'core/AuthStore';
import * as AuthActions         from 'core/AuthActions';

/**
 * HeaderApp of the website
 */

const orangeSfeir    = '#e66545';
const headerBarColor = '#CCCCCC';

export default class HeaderApp  extends Component  {


    constructor( props ) {
        super( props );
        this.state = {
            language : 'en'
        };
    }


    /**
     * modify app language
     * @param  {event} event
     * @param  {integer} index of the item on the list
     * @param  {String} value of the item (here fr/en)
     */
    handleChangeLanguage(event, index, value){
        this.setState({language : value});
        this.props.onLanguageChange(value);
    }

    /**
     * Render the logo on the top left of the toolbar
     */
    renderLogo(){
        return(
            <ToolbarGroup firstChild={true} float="left" style={{ paddingRight : '20px', paddingLeft : '1%', paddingTop : '3px'}}>
                <IndexLink to="/">
                    <img src = { logosfeir} alt='logosfeir' height='44px'/>
                </IndexLink>
            </ToolbarGroup>
        );
    }

    renderAbout(){
        return(
            <FlatButton onClick = {() => browserHistory.push('/about')} label='About' hoverColor = {orangeSfeir} />
        );
    }

    renderHomeLogout(){
        return(
            !_.isEmpty(AuthStore.currentUser) ? <FlatButton onClick={() => AuthActions.logout()} label='logout' hoverColor = {orangeSfeir}/> : <FlatButton hoverColor = {orangeSfeir} onClick={() => browserHistory.push('/login')} label='Home'/>
        )
    }

    /**
     * Render the DropDownMenu for language switch
     * call handleLanguageChange when the value change
     * TODO flag????
     */
    renderLanguageMenu(){
        return(
            <DropDownMenu value={this.state.language} onChange={this.handleChangeLanguage.bind(this)} style = {{ fontWeight: 'bold' }}>
                <MenuItem value= 'en' primaryText= {<FormattedMessage {...translations.MenuItemEnglish}/>} />
                <MenuItem value= 'fr' primaryText= {<FormattedMessage {...translations.MenuItemFrench}/>} />
            </DropDownMenu>
        );
    }

    renderBoardSearchBar(){
        return(
            <BoardSearchBar/>
        );
    }

    render(){
        return (
            <Toolbar style = {{backgroundColor : headerBarColor,  borderBottom: '1px solid rgba(179, 138, 109, 0.11)' }}>
                {this.renderLogo()}
                {!_.isEmpty(AuthStore.currentUser) ? this.renderBoardSearchBar() : null}
                <ToolbarGroup float="right">
                    {this.renderLanguageMenu()}
                    {this.renderAbout()}
                    {this.renderHomeLogout()}
                </ToolbarGroup>
            </Toolbar>
        )
    }

}
