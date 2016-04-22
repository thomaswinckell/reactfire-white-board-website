import { Store }        from 'airflux';

import * as ErrorActions     from './ErrorActions';

class ErrorStore extends Store {

    constructor() {
        super();
        this.state = {
            error : {
                type : ''
            }
        };

        ErrorActions.boardKeyNoMatch.listen( this._boardKeyNoMatch.bind( this ) );
        ErrorActions.throwError.listen( this._throwError.bind( this ) );
    }

    _boardKeyNoMatch(){
        this.state.error.type = 'BoardNotFound';
        this.publishState();
    }

    _throwError(error){
        this.state.error.type = 'AuthError';
        this.state.error.err = error;
        this.publishState();
    }
}

export default new ErrorStore();
