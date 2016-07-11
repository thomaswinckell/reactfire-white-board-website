import React,
{ Component, PropTypes } from 'react';

import {FormattedMessage,
        injectIntl}       from 'react-intl';
import translations             from '../i18n/messages/messages';

/**
 * Show an error message given a field validity
 *  TODO Fix intl which stay in locale en no matter when we are on fr
 */
 class MessageError extends Component {

    static contextTypes = {
        intl : PropTypes.object
    };


    render() {
        console.log('error' , this.context.intl.locale)
        const unsatisfiedConstraints = this.props.validity.unsatisfiedConstraints;
        if( !unsatisfiedConstraints || unsatisfiedConstraints.length === 0 ) {
            return null;
        }
        const constraint = unsatisfiedConstraints[ 0 ];
        const message = translations[ 'boardForm' ][ this.props.prop ][ 'errors' ][ constraint.id ];
        return (
            <FormattedMessage values={constraint} { ...message } />
        );
    }
}


export default injectIntl(MessageError);
