import { Class } from "../class.interface";

export interface Section{
    _id?:String,
    name : String,
    description : String,
    class : String ;
    maxStrength : Number;
    availableSeats:Number;
    hallName : String;
}