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

  getUser(){
    console.log("User API  CALLED");
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getData(route,params){
    console.log(params);
    return this.http.get<any>(`${environment.apiUrl}/${route}`,{params})
  }
  getSubject(){
    console.log("common service All Subject");
    return this.http.get<any>(`${environment.apiUrl}/get-subject`)
  }
  getUnit(subject_id){
    console.log("common service All Unit with Subject_id",subject_id);
    return this.http.get<any>(`${environment.apiUrl}/get-unit?subject_id=` +subject_id)
  }
  injectQuestionInTemplate(data){
    console.log("injectQuestionManually data",data);
    return this.http.post<any>(`${environment.apiUrl}/inject-question`,data);
  }
  getDataById(route){
    return this.http.get<any>(`${environment.apiUrl}/${route}`);
  }

  postData(route,data){
    return this.http.post<any>(`${environment.apiUrl}/${route}`,data);
  }

  putData(route,data){
    return this.http.put<any>(`${environment.apiUrl}/${route}`,data);

  }

  patchData(route,data){
    return this.http.patch<any>(`${environment.apiUrl}/${route}`,data);
  }

  deleteData(route,templateId){
    return this.http.delete<any>(`${environment.apiUrl}/${route}/` + templateId);
  }
  uploadTemplateQuestion(newQuestion){
    return this.http.post<any>(`${environment.apiUrl}/upload-template-question/`,newQuestion);
  }
  newAdmission(studentForm){
    return this.http.post<any>(`${environment.apiUrl}/student/register-student`,studentForm);

  }
}
