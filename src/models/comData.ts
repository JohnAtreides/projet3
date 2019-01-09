import {  IsMongoId,  IsISO8601,  IsNumberString, IsString, MaxLength, MinLength} from  "class-validator";
import {  Expose }  from "class-transformer";

/**
* Classe décrivant la structure des données nécessaires
* à l'ajout d'un nouveau match.
*/
export  class comData {

@Expose()
@IsString()
@MinLength(1, {message : "Sérieux ? rien d'autre à dire ??"})
@MaxLength(200, {message : "comment is too long"})
text :  string;

constructor() {
this.text ='';
}

}
