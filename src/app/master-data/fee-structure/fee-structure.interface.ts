import { Fee } from "../fee-category/fee.interface";
import { Class } from "../standard/class.interface";

export interface FeeStructure {
    _id?: String
    fees: {
        class: Class
        amount: Number,
        fee: Fee,
    }[];
    description: String
}