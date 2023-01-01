import { AlertService } from './../../../services/alert.service';
import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';

@Component({
  selector: 'app-manage-fee-category',
  templateUrl: './manage-fee-category.component.html',
  styleUrls: ['./manage-fee-category.component.scss']
})
export class ManageFeeCategoryComponent implements OnInit {
  feeFormFields: JsonFormData;
  isSaving: boolean;
  constructor(
    private feeDialogRef: MatDialogRef<ManageFeeCategoryComponent>,
    private commonService: CommonService,
    private jsonFormService: JsonFormService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData : { data : any, action: Action }
  ) { 
    console.log("MAT_DIALOG_DATA",dialogData);
  }

  ngOnInit(): void {
    this.jsonFormService.getFeeFormJson().subscribe(feeJson => {
      this.feeFormFields = feeJson;
      this.prepareFormFields();
    });
  }

  private prepareFormFields() {
    const { data, action } = this.dialogData
    console.log("prepareFormFields",data);
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

  private patchObjValuesToFormFields(obj){
    console.log("patchObjValuesToFormFields",obj);
    this.feeFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.feeFormFields.controls);
  }

  onSubmit(formValues) {
    console.log("feeForm", formValues)
    let form = formValues;
    let action : Action = this.dialogData?.action;
    switch (action) {
      case Action.ADD:
        this.add(formValues);
        break;
      case Action.EDIT:
      case Action.UPDATE:
        let {_id } = this.dialogData.data
        return this.update({...formValues,_id});

      default:
        break;
    }
    this.isSaving = true;
    
  }

  private add(formValues){
    this.commonService.addMasterFeeCategory(formValues).subscribe((result) => {
      console.log("masterFeeCategoryForm", result);
      this.isSaving = true;
      this.alertService.alertComponent(result.message);
      this.feeDialogRef.close();
    }, (error) => {
      console.log("masterFeeCategoryForm", error);
      this.isSaving = true;
    })
  }

  private update(formValues){
    this.commonService.updateMasterFeeCategory(formValues).subscribe((result) => {
      console.log("updateMasterFeeCategory", result);
      this.isSaving = true;
      this.alertService.alertComponent(result.message);
      return this.feeDialogRef.close();
    }, (error) => {
      console.log("updateMasterFeeCategory", error);
      this.isSaving = true;
    })
  }
}
