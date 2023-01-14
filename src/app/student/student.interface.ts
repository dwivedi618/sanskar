
export interface Student {
    _id?: String,
    studentPhoto: String;
    studentMobile?: String;
    firstName: String;
    middleName?: String;
    lastName: String;
    gender: String;
    dateOfBirth: Date;
    nationality: String;
    healthStatus: String;
    bloodGroup?: String;
    classId: String | {_id : String , name : String} ;
    conveniance: boolean;
    place: String;
    description: String,
    admissionInClass?:String
}

export interface Parent {
    _id?: String,
    fathersPhoto: string;
    father: string;
    mother: string;
    fathersOccupation: string;
    mothersOccupation: string;
    gaurdian: string;
    studentId: string;
    contact: string;
}



export interface PermanentAddress  {
    _id?:String,
    address: String,
    state: String,
    district: String,
    pin: String,
    studentId:String
}
export interface LocalAddress  {
    _id?:String,
    address: String,
    state: String,
    district: String,
    pin: String,
    studentId:String

}

export interface Address {
     permanentAddress : PermanentAddress,
     localAddress : LocalAddress
 }
