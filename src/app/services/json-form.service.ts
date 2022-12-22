import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonFormData } from '../layouts/shared/json-form/json-from.types';
@Injectable({
  providedIn: 'root'
})
export class JsonFormService {

  private jsonFormUrl ={
    feeFormJson : "assets/formJson/feeForm.json",
    classFormJson : "assets/formJson/classForm.json"

  }
  constructor(private http : HttpClient) { 
    
  }
  getFeeFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.feeFormJson);
  }
  getClassFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.classFormJson);
  }
}
