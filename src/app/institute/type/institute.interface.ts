export interface Banner {
    _id?: String,
    __v?: String,
    url: String
    title: String,
    subTitle: String,
    description: String,
    instituteId: String
    branchId: String,
    defaultSelected: Boolean
}

export interface Logo {
    _id?: String,
    __v?: String,
    logoUrl: String
    title: String,
    subTitle: String,
    description: String,
    instituteId: String
    branchId: String,
    defaultSelected: Boolean
}

export interface Institute {
    _id?: String,
    __v?: String,
    instituteName: String,
    founderName: String,
    affiliation: String,
    instituteCode: String,
    email: String,
    altEmail: String,
    contactNumber: String,
    isMainBranch: String,
    officeNumber: String,
    instituteType: String,
    packageType: String,
    panNumber: String,
    address: String
    logo: Logo,
    banners: Banner[]
}