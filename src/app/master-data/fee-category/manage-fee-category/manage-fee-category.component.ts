import { AlertService } from './../../../services/alert.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-fee-category',
  templateUrl: './manage-fee-category.component.html',
  styleUrls: ['./manage-fee-category.component.scss']
})
export class ManageFeeCategoryComponent implements OnInit {
  feeFormFields: JsonFormData;
  isSaving: boolean;
  constructor(
    private feeDialogRef : MatDialogRef<ManageFeeCategoryComponent>,
    private commonService: CommonService,
    private jsonFormService: JsonFormService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.jsonFormService.getFeeFormJson().subscribe(feeJson => { 
      this.feeFormFields = feeJson ;
    });
  }
  
  onSubmit(formValues) {
    console.log("feeForm",formValues)
    let form = formValues;
    this.isSaving = true;
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
}
