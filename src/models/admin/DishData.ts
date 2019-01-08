import {  IsMongoId,  IsISO8601,  IsNumberString, IsString, MinLength, MaxLength} from  "class-validator";
import {  Expose }  from "class-transformer";


export  class DishData {

@Expose()
@IsString()
@MinLength(5, {message : "dish's name is too short"})
@MaxLength(50, {message : "dish's name is too long"})
name :  string;

@Expose()
@IsString()
type :  string;
@Expose()
@IsString()
@MinLength(10, {message : "dish's description is too short"})
@MaxLength(400, {message : "dish's description is too long"})
desc :  string;

@Expose()
@IsString()
price :  string;


constructor() {
this.name ='';
this.type =  '';
this.desc =  '';
this.price =  '';
}

}
