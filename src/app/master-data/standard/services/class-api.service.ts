import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { API_ROUTES } from 'src/app/services/common.service';
import { Class } from '../class.interface';

@Injectable({
  providedIn: 'root'
})
export class ClassApiService {
  private API_ROUTES = API_ROUTES
  private $classesSub = new BehaviorSubject<Class[]>([]);
  constructor(private _http: HttpClient) { }

  $classes = this.fetch().pipe(pluck("data"));
  $classDropDown = this.fetch().pipe(
    pluck("data"),
    map((_classes: Class[]) => {
      return _classes.map((_class : Class) => { return ({ _id: _class._id, name: _class.name }) })
    }))



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


