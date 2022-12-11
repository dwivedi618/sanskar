
/* Tables(So called Collections in mongodb) */
export enum MyCollection{
    class = "class",
    fee = "fee",
    feeStructure = "feeStructure",
}
export interface Class{
    _id?:String,
    name : String,
    description : String
}