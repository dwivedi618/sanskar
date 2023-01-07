import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Fee, feeFrequencyEnum, FEE_FREEQUENCY } from '../../fee-category/fee.interface'
import { ButtonState, JsonFormService } from 'src/app/services/json-form.service';
import { ClassFee } from '../class.interface';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { ClassApiService } from '../services/class-api.service';
import { JsonFormArray, JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';


@Component({
  selector: 'app-manage-master-standard',
  templateUrl: './manage-master-standard.component.html',
  styleUrls: ['./manage-master-standard.component.scss']
})
export class ManageMasterStandardComponent implements OnInit {
  classFromGroup: FormGroup;
  classFeeFormArray: FormArray;
  isSaving: boolean;
  fees: any;
  classFormFields: JsonFormData;
  formGroup: FormGroup;
  classFeeFormFields: JsonFormArray;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private alertService: AlertService,
    private jsonFormService: JsonFormService,
    private classApiService: ClassApiService,
    private dialogRef: MatDialogRef<ManageMasterStandardComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: any, action: Action } = { data: {}, action: Action.ADD }
  ) {
    this.classFromGroup = this.fb.group({})
    this.formGroup = this.fb.group({ fees: this.classFeeFormArray })
    console.log("MAT_DIALOG_DATA", dialogData);
  }


  ngOnInit(): void {
    this.jsonFormService.getClassFormJson().subscribe(classFormJson => {
      this.classFormFields = classFormJson;
      this.prepareFormFields();
    });
    this.getFeeCategoryList()
  }

  private prepareFormFields() {
    const { data, action } = this.dialogData
    switch (action) {
      case Action.ADD:
        break;
      case Action.UPDATE:
      case Action.EDIT:
        this.patchObjValuesToFormFields(data);
        break;
      default:
        break;
    }
  }

  private patchObjValuesToFormFields(obj) {
    this.classFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj, this.classFormFields.controls);
  }

  onSubmit(formValues) {
    let form = formValues;
    let action: Action = this.dialogData?.action;
    switch (action) {
      case Action.ADD:
        this.add(formValues);
        break;
      case Action.EDIT:
      case Action.UPDATE:
        let { _id } = this.dialogData.data;
        return this.update({ ...formValues, _id });
      default:
        break;
    }
    this.isSaving = true;

  }

  private add(formValues) {
    this.classApiService.add(formValues).subscribe((result) => {
      this.isSaving = true;
      this.alertService.alertComponent(result.message);
      this.dialogRef.close();
    }, (error) => {
      this.isSaving = true;
    })
  }

  private update(formValues) {
    this.classApiService.update(formValues).subscribe((result) => {
      this.isSaving = true;
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      this.isSaving = true;
    })
  }



  getFeeCategoryList() {
    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result) => {
      this.fees = result['data'] || [];
      const classFeeJson = this.createClassFeeForm(this.fees);
      // this.createForm(classFeeJson);
    }, (error) => {
    })
  }
  createClassFeeForm(fees: Fee[]) {
    let classfees = [];
    let classFee = <ClassFee>{};
    fees.forEach((fee, index) => {
      const classFeeJson: JsonFormControls[] = [];
      classFee = { amount: 0, ...fee };
      delete classFee?.description;
      delete classFee?.__v;
      for (const [key, value] of Object.entries(classFee)) {
        if (key === 'amount' || key === '_id') {
          let control = <JsonFormControls>{};
          control.name = key;
          control.value = value || '';
          control.validators = key === 'amount' ? { required: true } : {};
          control.type = key === 'amount' ? 'number' : 'text';
          control.disabled = key === '_id' ? false : false;
          control.label = key === 'amount' ? `${classFee.name}( ${FEE_FREEQUENCY[String(classFee.frequency)]} )` : "";
          classFeeJson.push(control);
        }
      }

      classfees.push({ controls: classFeeJson })
      return classfees;
    })
    this.classFeeFormFields = classfees as JsonFormArray;
  }

  get feesFormArray() {
    return this.classFromGroup.controls["fees"] as FormArray;
  }

  onClassFeeSubmit(form) {
    console.log("classFess", form)
  }

}
