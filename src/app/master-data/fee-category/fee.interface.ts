export enum feeFrequencyEnum {
    "MONTHLY" = 1,
    "BIMESTERLY" = 2,
    "QUARTERLY" = 3,
    "QUADRIMESTERLY" = 4,
    "HALF-YEARLY" = 6,
    "YEARLY" = 12
}

/**
 * Description placeholder
 * @date 2/1/2023
 * @author Shivam Dwivedi
 * @type {{ 1: string; 2: string; 3: string; 4: string; 6: string; 12: string; }}
 * @ussage use as pipe to get string of frequency
 */
export const FEE_FREEQUENCY = {
    1: "MONTHLY",
    2: "BIMESTERLY",
    3: "QUARTERLY",
    4: "QUADRIMESTERLY",
    6: "HALF-YEARLY",
    12: "YEARLY"
}

export interface Fee {
    _id?: String
    __v?: String | Number
    name: String,
    description: String,
    frequency: Number,
    isOptional: Boolean
}