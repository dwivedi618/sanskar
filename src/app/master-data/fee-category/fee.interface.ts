export enum feeFrequencyEnum{
    "MONTHLY" = 1,
    "BIMESTERLY" = 2,
    "QUARTERLY" = 3,
    "QUADRIMESTERLY" = 4,
    "HALF-YEARLY" = 6,
    "YEARLY" = 12
}
export interface Fee{
    _id ? : String
    __v? : String | Number
    name : String,
    description : String,
    frequency : Number,
    isOptional: Boolean
}