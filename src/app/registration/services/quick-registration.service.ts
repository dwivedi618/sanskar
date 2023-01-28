import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class QuickRegistrationService {

  private API_ROUTES = API_ROUTES;
  constructor(private _http: HttpClient) { }

  quickRegistration(data) {
    return this._http.post<any>(this.API_ROUTES.quickRegistration, data)
  }
}
