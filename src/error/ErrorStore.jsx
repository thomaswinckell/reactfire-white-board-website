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
    }

    _boardKeyNoMatch(){
        this.state.error.type = 'BoardNotFound';
        console.log('emit');
        this.publishState();
    }
}

export default new ErrorStore();
