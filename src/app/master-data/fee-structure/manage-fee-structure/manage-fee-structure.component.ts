

import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Fee, feeFrequencyEnum, FEE_FREEQUENCY } from '../../fee-category/fee.interface'
import { ButtonState, JsonFormService } from 'src/app/services/json-form.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { ClassApiService } from '../../standard/services/class-api.service';
import { ManageMasterStandardComponent } from '../../standard/manage-master-standard/manage-master-standard.component';
import { ClassFee } from '../../standard/class.interface';
import { JsonFormData, JsonFormArray, JsonFormControls } from 'src/app/layouts/shared/json-form/json-from.types';


@Component({
  selector: 'app-manage-fee-structure',
  templateUrl: './manage-fee-structure.component.html',
  styleUrls: ['./manage-fee-structure.component.scss']
})
export class ManageFeeStructureComponent implements OnInit {
  classFromGroup: FormGroup;
  classFeeFormArray: FormArray;
  isSaving: boolean;
  fees: any;

  classFeeFormFields: JsonFormArray;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private alertService: AlertService,
    private jsonFormService: JsonFormService,
    private classApiService: ClassApiService,
    private dialogRef: MatDialogRef<ManageFeeStructureComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: any, action: Action } = { data: {}, action: Action.ADD }
  ) {
    console.log("MAT_DIALOG_DATA", dialogData);
  }

  ngOnInit(): void {
    this.getFeeCategoryList();
  }

  getFeeCategoryList() {
    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result) => {
      this.fees = result['data'] || [];
      this.classFeeFormFields = this.createClassFeeForm(this.fees);
      this.prepareFormFields();
    }, (error) => {
    })
  }
  private createClassFeeForm(fees: Fee[]) {
    let classfees = [];
    let classFee = <ClassFee>{};

    fees.forEach((fee, index) => {
      const classFeeJson: JsonFormControls[] = [];
      classFee = { amount: 0, fee: { ...fee } };
      for (const [key, value] of Object.entries(classFee)) {
        if (key === 'amount' || key === 'fee') {
          let control = <JsonFormControls>{};
          control.name = key;
          control.value = value || '';
          control.validators = key === 'amount' ? { required: true } : {};
          control.type = key === 'amount' ? 'number' : 'text';
          control.label = key === 'amount' ? `${classFee.fee.name}( ${FEE_FREEQUENCY[String(classFee.fee.frequency)]} )` : "";
          classFeeJson.push(control);
        }
      }
      classfees.push({ controls: classFeeJson })
      return classfees;
    })
    return classfees as JsonFormArray;
  }

  private prepareFormFields() {
    const { data, action } = this.dialogData
    switch (action) {
      case Action.ADD:
      case Action.UPDATE:
      case Action.EDIT:
        this.patchObjValuesToFormFields(data.fees);
        break;
      default:
        break;
    }
  }

  private patchObjValuesToFormFields(classFees: ClassFee[]) {
    classFees.forEach((classFee: ClassFee, index) => {
      this.classFeeFormFields[index]['controls'] = this.jsonFormService.patchValuesToFormFields(classFee, this.classFeeFormFields[index]['controls']);
    })
  }

  onSubmit(formValues) {
    let action: Action = this.dialogData?.action;
    switch (action) {
      case Action.ADD:
        //class wise fee can be only updated with PATCH method of class itself
      case Action.EDIT:
      case Action.UPDATE:

        let { standardId } = this.dialogData.data;
        console.log("Submit", this.dialogData.data);
        if (!standardId) {
          this.alertService.alert('Opps! Not could not saved', 'close');
          return;
        }
        const payload = {
          _id: standardId,
          fees: formValues
        }
        return this.update(payload);
      default:
        this.alertService.alert('Unknown action', 'close');
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
    console.log(formValues);
    this.classApiService.update(formValues).subscribe((result) => {
      this.isSaving = true;
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      this.isSaving = true;
    })
  }



  onClassFeeSubmit(form) {

    console.log("classFess", form);

  }

}