import { Class } from "../class.interface";
import { Fee } from "../section/fee.interface";

export interface FeeStructure {
    _id?: String
    fees: {
        amount: Number,
        class: Class
        fee: Fee,
    }[];
    description: String
}