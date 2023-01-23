import { Class } from "../standard/class.interface";

export interface AcademicYear {
    _id?: String,
    __v?: String,
    name: String,
    description: String,
    session:String,
    shiftType : String,
    startTime : String,
    endTime : String,
    startDate: Date,
    endDate:Date,
    classes ?: Class[]
}