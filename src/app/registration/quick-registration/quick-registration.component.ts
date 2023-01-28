import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { JsonFormService } from 'src/app/services/json-form.service';

@Component({
  selector: 'app-quick-registration',
  templateUrl: './quick-registration.component.html',
  styleUrls: ['./quick-registration.component.scss']
})
export class QuickRegistrationComponent implements OnInit {

  formFields: JsonFormData;
  constructor(    @Inject(MAT_DIALOG_DATA) public dialogData : { data : any, action: Action },
                  private jsonFormService: JsonFormService,
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
  onSubmit(event){
    console.log(event);
    
  }
}
