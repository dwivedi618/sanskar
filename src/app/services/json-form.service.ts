import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonFormControls, JsonFormData } from '../layouts/shared/json-form/json-from.types';
@Injectable({
  providedIn: 'root'
})
export class JsonFormService {

  private jsonFormUrl ={
    feeFormJson : "assets/formJson/feeForm.json",
    classFormJson : "assets/formJson/classForm.json",
    admissionForm : "assets/formJson/admissionForm.json"

  }
  constructor(private http : HttpClient,private fb: FormBuilder) { 
    
  }
  getFeeFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.feeFormJson);
  }
  getClassFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.classFormJson);
  }
  getAdmissionFormJson(){
    return this.http.get
      <{
        studentForm: JsonFormData,
        parentForm: JsonFormData,
        permanentAddressForm: JsonFormData,
        localAddressForm: JsonFormData
      }>
    (this.jsonFormUrl.admissionForm);
  }
  createForm(controls: JsonFormControls[]):FormGroup {
    let formGroup = this.fb.group({});
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control?.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }

      }
      formGroup.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
    return formGroup;
  }
}
