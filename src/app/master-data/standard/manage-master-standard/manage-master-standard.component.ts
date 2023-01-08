import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { ClassApiService } from '../services/class-api.service';
import { JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';


@Component({
  selector: 'app-manage-master-standard',
  templateUrl: './manage-master-standard.component.html',
  styleUrls: ['./manage-master-standard.component.scss']
})
export class ManageMasterStandardComponent implements OnInit {
  isSaving: boolean;
  fees: any;
  classFormFields: JsonFormData;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private alertService: AlertService,
    private jsonFormService: JsonFormService,
    private classApiService: ClassApiService,
    private dialogRef: MatDialogRef<ManageMasterStandardComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: any, action: Action } = { data: {}, action: Action.ADD }
  ) {}


  ngOnInit(): void {
    this.jsonFormService.getClassFormJson().subscribe(classFormJson => {
      this.classFormFields = classFormJson;
      this.prepareFormFields();
    });
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

  onClassFeeSubmit(form) {
    console.log("classFess", form)
  }
}
