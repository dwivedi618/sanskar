import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }



  masterstandard(standard) {
    return this.http.post<any>(`${environment.apiUrl}/v1/master/standard`, standard)
  }
  getMasterStandard(standard) {
    return this.http.get<any>(`${environment.apiUrl}/v1/master/standard`)
  }
  masterFee(fee) {
    return this.http.post<any>(`${environment.apiUrl}/v1/master/fee`, fee)
  }
  masterFeeStructure(feeStructure) {
    return this.http.post<any>(`${environment.apiUrl}/v1/master/fee-structure`, feeStructure)
  }
  studentRecord(formData) {
    return this.http.post<any>(`${environment.apiUrl}/v1/student`, formData)
  } 
  parentRecord(studentId , parentRecord) {
    return this.http.post<any>(`${environment.apiUrl}v1/student/${studentId}`, parentRecord)
  } 


  
}
