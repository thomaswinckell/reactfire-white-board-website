import { Action }   from 'airflux';

/* Board Actions Manager */

export const addBoard            : Action = new Action().asFunction;
export const deleteBoard         : Action = new Action().asFunction;
export const filterText          : Action = new Action().asFunction;
export const showBoard           : Action = new Action().asFunction;
export const showAddForm         : Action = new Action().asFunction;
export const boardExist          : Action = new Action().asFunction;
export const returnBoardExist    : Action = new Action().asFunction;
