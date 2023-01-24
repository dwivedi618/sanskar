import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { API_ROUTES } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearApiService {
  private API_ROUTES = API_ROUTES;
  constructor(private _http: HttpClient) { }

  fetch(id:string) {
    return this._http.get<any>(this.API_ROUTES.academicYear).pipe(pluck("data"));
  }
  
  delete(data) {
    let options = {
      headers: new HttpHeaders,
      body: data
    }
    console.log("aoi del data", data)
    return this._http.delete(this.API_ROUTES.academicYear, options);
  }

  addMasterFeeCategory(data) {
    return this._http.post<any>(this.API_ROUTES.academicYear, data)
  }

  updateMasterFeeCategory(data) {
    return this._http.patch<any>(this.API_ROUTES.academicYear, data)
  }
}
