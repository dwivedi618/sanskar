import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassApiService {
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
    return this._http.delete(this.API_ROUTES.class, options);
  }
  add(data) {
    return this._http.post<any>(this.API_ROUTES.class, data);
  }
  fetch() {
    return this._http.get<any>(this.API_ROUTES.class)
  }
  update(data) {
    return this._http.patch<any>(this.API_ROUTES.class, data)
  }
}


