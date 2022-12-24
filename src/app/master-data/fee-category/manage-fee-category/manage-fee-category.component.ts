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
  feeFromGroup: FormGroup = this.fb.group({});
  isSaving: boolean;
  constructor(
    private feeDialogRef : MatDialogRef<ManageFeeCategoryComponent>,
    private fb: FormBuilder,
    private commonService: CommonService,
    private jsonFormService: JsonFormService,
    private alertService: AlertService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.createForm(this.feeFormFields.controls);
  }

  ngOnInit(): void {
    this.jsonFormService.getFeeFormJson().subscribe(feeJson => { 
      this.feeFormFields = feeJson ;
      this.createForm(this.feeFormFields.controls);
    });

  }
  
  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
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
      this.feeFromGroup.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }


  onSubmit() {
    console.log("feeForm", this.feeFromGroup.value)
    if (this.feeFromGroup.invalid) {
      this.alertService.alert('Can not insert empty data', 'close');
      return
    }
    this.isSaving = true;
    this.commonService.addMasterFeeCategory(this.feeFromGroup.value).subscribe((result) => {
      console.log("masterFeeCategoryForm", result);
      this.isSaving = true;
      this.alertService.alertComponent(result.message);
      this.feeFromGroup.reset();
      this.feeDialogRef.close();
    }, (error) => {
      console.log("masterFeeCategoryForm", error);
      this.isSaving = true;

    })
  }



}
