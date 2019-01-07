
import {  IsMongoId,  IsISO8601,  IsNumberString} from  "class-validator";
import {  Expose }  from "class-transformer";


export  class DeleteCommentData {


@Expose()
@IsMongoId()
id :  string;
constructor() {
this.id =  '';
}

}
