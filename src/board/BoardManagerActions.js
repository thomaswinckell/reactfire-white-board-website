import { Action }   from 'airflux';

import Firebase         from 'firebase';

import { firebaseUrl }  from 'config/AppConfig';

/* Board Actions Manager */

export const addBoard            : Action = new Action().asFunction;
export const deleteBoard         : Action = new Action().asFunction;
export const filterText          : Action = new Action().asFunction;
export const saveEdit            : Action = new Action().asFunction;

const boardsRef = new Firebase( `${firebaseUrl}/boards` );

/**
 * Return the type of board if it exist
 * else return false
 */
export const boardExist : Action = new Action().asyncResult( boardKey => {
    return new Promise( ( resolve, reject ) => {
        boardsRef.child( boardKey ).once('value', exist => {
            if(exist.val() === null){
                resolve( false );
            } else {
                resolve( exist.val().type );
            }
        });
    } );
} ).asFunction;
