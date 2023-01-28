import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { JsonFormControls, JsonFormData } from '../layouts/shared/json-form/json-from.types';
export type ButtonType = 'reset' | 'submit' | 'button';
export type ButtonState = { type: ButtonType , isClicked : boolean};
@Injectable({
  providedIn: 'root'
})

export class JsonFormService {

  formButton = new BehaviorSubject<ButtonState>({type : 'submit',isClicked : false})
  clickFormButton(button:ButtonState){
    this.formButton.next(button);
  }
  private jsonFormUrl ={
    feeFormJson : "assets/formJson/feeForm.json",
    classFormJson : "assets/formJson/classForm.json",
    admissionForm : "assets/formJson/admissionForm.json",
    sectionForm : "assets/formJson/sectionForm.json",
    academicYearFormJson : "assets/formJson/academicYearForm.json",
    instituteInformationFormJson : "assets/formJson/instituteInformationForm.json",
    quickRegistrationFormJson : "assets/formJson/quickRegistrationForm.json"
  }
  constructor(private http : HttpClient,private fb: FormBuilder) { 
    
  }
  getFeeFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.feeFormJson);
  }
  getAcademicYearFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.academicYearFormJson);
  }
  getInstituteInformationFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.instituteInformationFormJson);
  }
  getSectionFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.sectionForm);
  }
  getClassFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.classFormJson);
  }
  getQuickRegistrationFormJson(){
    return this.http.get<JsonFormData>(this.jsonFormUrl.quickRegistrationFormJson);
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
        this.fb.control({value :control.value,disabled:control.disabled}, validatorsToAdd)
      );
    }
    return formGroup;
  }

  asyncCreateForm(controls: JsonFormControls[]):Promise<FormGroup> {
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
        this.fb.control({value :control.value,disabled:control.disabled}, validatorsToAdd)
      );
    }
    return Promise.resolve(formGroup);
  }

  patchValuesToFormFields(obj={},controls: JsonFormControls[]=[]){
    console.log("patchObjValuesToFormFields",obj);

    controls.forEach((field:JsonFormControls,index) =>{
      // console.log("forEach field",field,obj[field.name]);
      if(!!obj[field.name]){
        controls[index].value = obj[field.name] == ('true' || 'false') ? 
        Boolean(obj[field.name]): 
        obj[field.name];
      }
    })
    return controls;
  }
}
