import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { QuickRegistrationService } from '../services/quick-registration.service';

@Component({
  selector: 'app-quick-registration',
  templateUrl: './quick-registration.component.html',
  styleUrls: ['./quick-registration.component.scss']
})
export class QuickRegistrationComponent implements OnInit {

  formFields: JsonFormData;
  isSaving: boolean;
  constructor(    
    @Inject(MAT_DIALOG_DATA) public dialogData : { data : any, action: Action },
    private quickRegisterationDialogRef: MatDialogRef<QuickRegistrationService>,
    private quickRegistrationApiService : QuickRegistrationService,
    private jsonFormService: JsonFormService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    
    this.jsonFormService.getQuickRegistrationFormJson().subscribe(formJson => {
      console.log('init called',formJson);
      this.formFields = formJson;
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
    this.formFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.formFields.controls);
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
      case Action.UPDATE: break;

      default:
        break;
    }
    // this.isSaving = true;
    
  }

  private add(formValues){
    this.quickRegistrationApiService.quickRegistration(formValues).subscribe((result) => {
      console.log("getQuickRegistrationFormJson", result);
      // this.isSaving = true;
      // this.alertService.alertComponent(result.message);
      this.quickRegisterationDialogRef.close();
    }, (error) => {
      console.log("getQuickRegistrationFormJson", error);
      // this.isSaving = true;
    })
    
  }
}
