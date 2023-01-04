
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {
  private API_ROUTES = {
    fee: environment.apiUrl + '/' + 'fee',
    class: environment.apiUrl + '/' + 'class',
    feeStructure: environment.apiUrl + '/' + 'feeStructure',
    student: environment.apiUrl + '/' + 'student'
  }
  constructor(private _http: HttpClient) { }

  delete(data) {
    let options = {
      headers: new HttpHeaders,
      body: data
    }
    console.log("aoi del data", data)
    return this._http.delete(this.API_ROUTES.student, options);
  }
  add(data) {
    return this._http.post<Student>(this.API_ROUTES.student, data);
  }
  fetch() {
    return this._http.get<Student[]>(this.API_ROUTES.student)
  }
  update(data) {
    return this._http.patch<Student>(this.API_ROUTES.student, data)
  }
}


