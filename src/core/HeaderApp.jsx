import _                        from 'lodash';
import $                        from 'jquery';
import React,
       { Component, PropTypes } from 'react';
import BoardSearchBar           from 'board/BoardSearchBar';

import Toolbar                  from 'material-ui/Toolbar/Toolbar';
import ToolbarTitle             from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarGroup             from 'material-ui/Toolbar/ToolbarGroup';
import MenuItem                 from 'material-ui/MenuItem';
import DropDownMenu             from 'material-ui/DropDownMenu';
import RaisedButton             from 'material-ui/RaisedButton';
import IconMenu                 from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconButton               from 'material-ui/IconButton';
import ToolbarSeparator         from 'material-ui/Toolbar/ToolbarSeparator';
import ContentAdd               from 'material-ui/svg-icons/content/add';
import logosfeir                from 'images/logosfeir.png';

import {FormattedMessage}       from 'react-intl';
import translations             from 'i18n/messages/messages';

import {Link, IndexLink}        from 'react-router';

import AuthStore                from 'core/AuthStore';
import * as AuthActions         from 'core/AuthActions';

import AddBoard                 from 'board/AddBoard'


import * as Actions            from 'board/BoardManagerActions';

/**
 * HeaderApp of the website
 */
export default class HeaderApp  extends Component  {

    constructor( props ) {
        super( props );
        this.state = {
            language : 'en'
        };
    }

    /**
     * depreciated
     */
    onClickAdd(){
        Actions.showAddForm();
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
     * fire the logout actions
     * @param  {event} event
     * @param  {[type]} value of the item
     */
    handleChangeIconMenu(event, value){
        if ( value === 'logout' ){
            AuthActions.logout();
        }
    }

    /**
     * Emit an event 'addBoard' to the boardManagerStore
     * @param  {[board]} board
     */
    handleBoardSubmit(board){
        Actions.addBoard(board);
    }

    /**
     * Render the logo on the top left of the toolbar
     */
    renderLogo(){
        return(
            <ToolbarGroup firstChild={true} float="left" style={{ paddingRight : '20px', paddingLeft : '1%'}}>
                <IndexLink to="/">
                    <img src = { logosfeir} alt='logosfeir' height='44px'/>
                </IndexLink>
            </ToolbarGroup>
        );
    }

    renderIconMenu(){
        return(
            <ToolbarGroup float="right" lastChild={true}>
                <IconMenu onChange={this.handleChangeIconMenu.bind(this)} iconButtonElement={
                    <IconButton touch={true}>
                        <NavigationExpandMoreIcon />
                    </IconButton>}>
                    <MenuItem>
                        <Link to={'/about'}>about</Link>
                    </MenuItem>
                        {!_.isEmpty(AuthStore.currentUser) ? <MenuItem value= 'logout' primaryText='logout'/> : <MenuItem><Link to={'/login'}> Home </Link></MenuItem>}
                </IconMenu>
            </ToolbarGroup>
        );
    }

    /**
     * Render the DropDownMenu for language switch
     * call handleLanguageChange when the value change
     */
    renderLanguageMenu(){
        return(
            <ToolbarGroup float="right">
                <DropDownMenu value={this.state.language} onChange={this.handleChangeLanguage.bind(this)} style = {{ fontWeight: 'bold' }}>
                    <MenuItem value= 'en' primaryText= {<FormattedMessage {...translations.MenuItemEnglish}/>} />
                    <MenuItem value= 'fr' primaryText= {<FormattedMessage {...translations.MenuItemFrench}/>} />
                </DropDownMenu>
            </ToolbarGroup>
        );
    }

    renderAddBoardForm(){
        return(
            <ToolbarGroup float="right" style={{ paddingTop : '6px', width : '1020px', paddingLeft : '1%' }}>
                <AddBoard onBoardSubmit={this.handleBoardSubmit.bind(this)}/>
            </ToolbarGroup>
        );
    }

    renderBoardSearchBar(){
        return(
            <BoardSearchBar/>
        );
    }

    render(){
        return (
            <Toolbar style = {{backgroundColor : '#cccccc',  borderBottom: '1px solid rgba(179, 138, 109, 0.11)' }}>
                {this.renderLogo()}
                {this.renderBoardSearchBar()}
                {this.props.addForm ? this.renderAddBoardForm() : null}
                {this.renderLanguageMenu()}
                {this.renderIconMenu()}
            </Toolbar>
        )
    }

}
