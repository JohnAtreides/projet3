import {  IsMongoId,  IsISO8601,  IsNumberString, IsString, MaxLength} from  "class-validator";
import {  Expose }  from "class-transformer";

/**
* Classe décrivant la structure des données nécessaires
* à l'ajout d'un nouveau match.
*/
export  class CommentData {

@Expose()
@IsString()
@MaxLength(200, {message : "comment is too long"})
text :  string;

@Expose()
@IsString()
wid :  string;

constructor() {
this.text ='';
this.wid =  '';
}

}
