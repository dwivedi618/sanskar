import { Fee } from "../fee-category/fee.interface"

/* Tables(So called Collections in mongodb) */
export enum MyCollection{
    class = "class",
    fee = "fee",
    feeStructure = "feeStructure",
}

export interface ClassFee{
    amount : number;
    fee : Fee
}

export interface Class{
    _id?:String,
    name : String,
    description : String
    fees : ClassFee[];
}