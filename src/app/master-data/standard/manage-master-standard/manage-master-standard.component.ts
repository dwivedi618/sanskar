import { AlertService } from '../../../services/alert.service';

import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import {Fee, feeFrequencyEnum } from '../../fee-category/fee.interface'
import { JsonFormService } from 'src/app/services/json-form.service';
import { JsonFormArray, JsonFormControls, JsonFormData } from '/home/v-shivam.dwivedi/Downloads/projects/nest/sanskar/src/app/layouts/shared/json-form/json-from.types';
import { ClassFee } from '../class.interface';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
  

@Component({
  selector: 'app-manage-master-standard',
  templateUrl: './manage-master-standard.component.html',
  styleUrls: ['./manage-master-standard.component.css']
})
export class ManageMasterStandardComponent implements OnInit {
  classFromGroup : FormGroup;
  classFeeFormArray : FormArray;
  isSaving: boolean;
  fees: any;
  classFormFields : JsonFormData ;
  formGroup : FormGroup;
  classFeeFormFields: JsonFormArray;

  
  constructor(
    private fb : FormBuilder,
    private commonService : CommonService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService
  ) { 
    this.classFromGroup = this.fb.group({})
    this.formGroup = this.fb.group({fees : this.classFeeFormArray})
    this.classFeeFormArray = this.fb.array([])
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    this.jsonFormService.getClassFormJson().subscribe(classFormJson => { 
      this.classFormFields = classFormJson ;
      
      this.classFromGroup = this.createForm(this.classFormFields.controls);

    });
    this.getFeeCategoryList()
  }

  createForm(controls: JsonFormControls[]) {

    let formGroup = this.fb.group({});
    // console.log(JSON.stringify(controls,null ,2))

    // console.log("class controls-----------------------------",controls);
    for (const control of controls) {
      // console.log(control.name)

      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
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
        this.fb.control({value : control.value,disabled: control.disabled}, validatorsToAdd)
      );
      // console.log(`${control.name} : ${JSON.stringify(this.classFromGroup.value)}`)

    }
    return formGroup;
  }

  createFeeForm(controls: JsonFormControls[]) {
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
        this.fb.control({value : control.value,disabled: control?.disabled}, validatorsToAdd)
      );
      // console.log(`${control.name} : ${JSON.stringify(this.formGroup.value)}`)

    }
    this.classFeeFormArray.push(formGroup)

  }
  
  onClassSubmit(form){
    let formValues = form;
    if(!form){
      this.alertService.alert('Can not insert empty data','close');
      return
    }
    this.isSaving =true;
    this.commonService.masterstandard(formValues).subscribe((result)=>{
      this.isSaving =false;
      this.alertService.alertComponent(result.message || 'Submitted');
      this.classFromGroup.reset();
    },(error)=>{
      this.isSaving =false;
    })
  }

  getFeeCategoryList() {
    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result) => {
      // console.log("getMasterFeeCategory result", result);
      this.fees = result['data'] || [];
      const classFeeJson = this.createClassFeeForm(this.fees);
      // this.createForm(classFeeJson)
    }, (error) => {
    })
  }
  createClassFeeForm(fees : Fee[]){
    let classfees  = [];
    let classFee = <ClassFee>{};
    fees.forEach((fee,index)=>{
      const classFeeJson : JsonFormControls[] = [];
      classFee = {amount : 0,...fee};
      delete classFee?.description;
      delete classFee?.__v;
      for (const [key,value] of Object.entries(classFee)) {
        let control = <JsonFormControls>{};
        // console.log(`${key}  : ${value}`)
        control.name = key;
        control.value = value;
        control.validators = key === 'amount' ? { required : true} : {};
        control.type = key === 'amount' ? 'number' : 'text';
        control.disabled = false;
        control.label = key === 'amount' ? `${classFee.name} | ${classFee.frequency} | ${classFee.isOptional ? "Optional" : "Mandatory"}`: "";
        classFeeJson.push(control);
      } 
      // console.log("}")

      this.createFeeForm(classFeeJson);

      classfees.push(classFeeJson)
      // console.log(JSON.stringify(classfees));
      return classfees;
    })
    this.classFeeFormFields = classfees as JsonFormArray;    
    console.log(this.classFeeFormFields)
    this.classFromGroup.addControl("fees",this.classFeeFormArray);
    // this.formGroup = this.fb.group({fees : this.classFeeFormArray,...this.classFromGroup.controls})
    // this.classFromGroup = this.fb.group(this.createForm(this.classFormFields.controls));

    // console.log("1::classFeeJson",classFeeJson)
    console.log("control",this.feesFormArray.controls[0]["controls"]);
    

  }
  get feesFormArray() {
    return this.classFromGroup.controls["fees"] as FormArray;
  }

  onChange(isChecked: boolean) {
    console.log("isChecked", isChecked);
    isChecked ? this._removeFeeFormArray() : this._addFeeFormArray()

  }
  private _removeFeeFormArray() {
    this.classFromGroup.removeControl("fees");
  }
  private _addFeeFormArray() {
    this.classFromGroup.addControl("fees", this.classFeeFormArray);
  }
  
}
