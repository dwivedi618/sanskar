import { Student } from './../student/students-list/students-list.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JsonFormControlOptions } from '../layouts/shared/json-form/json-from.types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public API_ROUTES = {
    fee: environment.apiUrl + '/' + 'fee',
    class: environment.apiUrl + '/' + 'class',
    feeStructure: environment.apiUrl + '/' + 'feeStructure',
    student: environment.apiUrl + '/' + 'student'
  }
 
  constructor(
    private http: HttpClient
  ) { }



  masterstandard(standard) {
    return this.http.post<any>(this.API_ROUTES.class,standard);
  }


  getMasterStandard() {
    return this.http.get<any>(this.API_ROUTES.class)
  }



  addMasterFeeCategory(data) {
    return this.http.post<any>(this.API_ROUTES.fee,data)
  }
  getMasterFee(id:String = '') {
    return this.http.get<any>(this.API_ROUTES.fee+'/'+id);
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


  getMasterFeeStructure(session,classId) {
    return this.http.get<any>(this.API_ROUTES.feeStructure)
  }
  getClassFeeById(session,classId='') {
    return this.http.get<any>(`${this.API_ROUTES.class}?classId=${classId}&session=${session}`);
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


  formOptions = {
    getClasses : new BehaviorSubject<JsonFormControlOptions[]>([])
  };
  getClassesForFormOptions(method):Observable<JsonFormControlOptions[]>{
    this.getMasterStandard().subscribe(res=>{
      if(res && res?.data){
        let options = this.formatDataAsOptions(res.data);
        console.log("options",options);
        this.formOptions.getClasses.next(options)
        console.log("formOptions",this.formOptions);
      }
    });  
    return this.formOptions.getClasses.asObservable();
  }

  private formatDataAsOptions(data){
    let options: JsonFormControlOptions[] = [];
    data.forEach(item =>{
      let option : JsonFormControlOptions = {value : "", label : "",icon:""};
      option.value = item._id;
      option.label = item.name;
      option.icon = "";
      options.push(option);
    })
    return options ;
  }

}
