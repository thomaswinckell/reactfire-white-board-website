import { Action }   from 'airflux';

/* Auth Actions Manager */

export const logout            : Action = new Action().asFunction;
export const logWithGoogle     : Action = new Action().asyncResult().withChildren( [ 'progressed ' ] ).asFunction;

