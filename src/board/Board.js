import { Required, MinLength }      from 'react-forms-validation';
   export default class Board {

    @Required @MinLength( 3 )
    name : string;

    @Required @MinLength( 3 )
    description : string;

    @Required
    type : number;

    // constructor(type=1){
    //     this.type = type
    // }

}
