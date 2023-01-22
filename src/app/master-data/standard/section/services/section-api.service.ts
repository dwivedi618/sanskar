import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionApiService {
  private API_ROUTES = API_ROUTES;
  constructor(private _http: HttpClient) { }

  getById(classId = '') {
    return this._http.get<any>(`${this.API_ROUTES.section}?classId=${classId}`);
  }
  delete(data) {
    let options = {
      headers: new HttpHeaders,
      body: data
    }
    console.log("aoi del data", data)
    return this._http.delete(this.API_ROUTES.section, options);
  }

  add(data) {
    return this._http.post<any>(this.API_ROUTES.section, data)
  }

  update(data) {
    return this._http.patch<any>(this.API_ROUTES.section, data)
  }
}
