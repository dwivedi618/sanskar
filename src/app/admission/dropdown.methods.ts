/**
 * NOTE : these methods must match with  type JsonFormControls.method
 * IMPORTANT : these method should not match with API_SERVICE_METHOD 
 * Else in service to get dropdown data recursively call its self
 */
export const DYNAMIC_METHODS = ["states","classes","districts"]
export const METHODS = {
    getIndianStates : "states",
    getClasses : "classes",
    getDistricts : "districts",

}