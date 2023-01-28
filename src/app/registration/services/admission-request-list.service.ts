import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AdmissionRequestListService {

  private API_ROUTES = API_ROUTES;
  constructor(private _http: HttpClient) { }

  admissionRequestList() {
    return this._http.get<any>(this.API_ROUTES.admissionRequestList)
  }
}
