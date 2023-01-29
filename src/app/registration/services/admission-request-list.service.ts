import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck, map } from 'rxjs/operators';
import { API_ROUTES } from 'src/app/services/common.service';
import { Student } from 'src/app/student/student.interface';

@Injectable({
  providedIn: 'root'
})
export class AdmissionRequestListService {

  private API_ROUTES = API_ROUTES;
  constructor(private _http: HttpClient) { }

  admissionRequestList() {
    return this._http.get<any>(this.API_ROUTES.admissionRequestList)
    // .pipe(
    //   pluck('data'),
    //   map((student:Student) => {
    //     console.log(student);
        
    //     let name = this.name(student);
    //     const  admissionInClass = student?.classId["name"] || "";
    //     return {name,admissionInClass,...student}
    //   })
    // )
  }
  // private name(data): string {
  //   const { firstName = '', middleName = '', lastName = '' } = data || {};
  //   return `${firstName} ${middleName} ${lastName}`
  // }
}
