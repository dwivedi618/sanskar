import { Fee } from "../fee-category/fee.interface";
import { Class } from "../standard/class.interface";

export interface FeeStructure {
    _id?: String
    fees: {
        amount: Number,
        class: Class
        fee: Fee,
    }[];
    description: String
}