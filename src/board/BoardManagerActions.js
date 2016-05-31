import { Action }   from 'airflux';

import Firebase         from 'firebase';

import { firebaseUrl }  from 'config/AppConfig';

/* Board Actions Manager */

export const addBoard            : Action = new Action().asFunction;
export const deleteBoard         : Action = new Action().asFunction;
export const filterText          : Action = new Action().asFunction;
export const showBoard           : Action = new Action().asFunction;
export const showAddForm         : Action = new Action().asFunction;

const boardsRef = new Firebase( `${firebaseUrl}/boards` );

export const boardExist : Action = new Action().asyncResult( boardKey => {
    return new Promise( ( resolve, reject ) => {
        boardsRef.child( boardKey ).once('value', exist => {
            if(exist.val() === null){
                resolve( false );
            } else {
                resolve( true );
            }
        });
    } );
} ).asFunction;
