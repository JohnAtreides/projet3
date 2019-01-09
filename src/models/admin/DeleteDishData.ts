
import {  IsMongoId,  IsISO8601,  IsNumberString} from  "class-validator";
import {  Expose }  from "class-transformer";


export  class DeleteDishData {


@Expose()
@IsMongoId()
_id :  string;
constructor() {
this._id = '';
}

}
