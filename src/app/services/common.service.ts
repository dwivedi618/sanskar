import { Student } from './../student/students-list/students-list.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  configUrls = {
    classConfig : environment.apiUrl + "/class-config",
    feeConfig : environment.apiUrl + "/fee-config",


  }
  constructor(
    private http: HttpClient
  ) { }



  masterstandard(standard) {
    return this.http.post<any>(this.configUrls.classConfig,standard);
  }


  getMasterStandard() {
    return this.http.get<any>(this.configUrls.classConfig)
  }



  addMasterFeeCategory(data) {
    return this.http.post<any>(this.configUrls.feeConfig,data)
  }
  getMasterFee(id:String = '') {
    return this.http.get<any>(this.configUrls.feeConfig+'/'+id);
  }

  studentFeeDeposit(studentId,fee) {
    return this.http.post<any>(`${environment.apiUrl}/v1/student/${studentId}/fee-deposit`, fee)
  }
  studentFeeDetails(studentId) {
    return this.http.get<any>(`${environment.apiUrl}/v1/student/${studentId}/fee-detail`)
  }


  getMasterFeeCategory() {
    return this.http.get<any>(`${environment.apiUrl}/v1/master/fee`)
  }


  addMasterFeeStructure(feeStructure) {
    return this.http.post<any>(`${environment.apiUrl}/v1/master/fee-structure`, feeStructure)
  }


  getMasterFeeStructure(session,standardId) {
    return this.http.get<any>(`${environment.apiUrl}/v1/master/fee-structure?year=${session}&standardId=${standardId}`)
  }


  studentRecord(formData) {
    return this.http.post<any>(`${environment.apiUrl}/v1/student`, formData)
  }
  updateStudentRecord(formData,studentId) {
    return this.http.put<any>(`${environment.apiUrl}/v1/student/${studentId}`, formData)
  }
  
  getStudentRecord() {
    return this.http.get<any>(`${environment.apiUrl}/v1/student`)
  } 
  getStudentRecordById(studentId) {
    return this.http.get<any>(`${environment.apiUrl}/v1/student/${studentId}`)
  } 
  
  parentRecord(studentId , parentRecord) {
    console.log("parentRecord",studentId,parentRecord)
    return this.http.post<any>(`${environment.apiUrl}/v1/student/${studentId}/parents`, parentRecord)
  } 
  updateParentRecord(studentId , parentRecord) {
    console.log("parentRecord",studentId,parentRecord)
    return this.http.put<any>(`${environment.apiUrl}/v1/student/${studentId}/parents`, parentRecord)
  }

  studentAddress(studentId , address) {
    console.log("parentRecord",studentId,address)
    return this.http.post<any>(`${environment.apiUrl}/v1/student/${studentId}/address`, address)
  } 
  updateStudentAddress(studentId , address) {
    console.log("parentRecord",studentId,address)
    return this.http.put<any>(`${environment.apiUrl}/v1/student/${studentId}/address`, address)
  } 

}
