import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { LocalAddressApiService } from '../../services/local-address/local-address-api.service';
import { StudentActionService } from '../../services/student/student-action.service';
import { LocalAddress } from '../../student.interface';

@Component({
  selector: 'app-local-address-form',
  templateUrl: './local-address-form.component.html',
  styleUrls: ['./local-address-form.component.scss']
})
export class LocalAddressFormComponent implements OnInit {
  isFormLoading: boolean;
  localAddressFormFields: JsonFormData;
  isSaving: boolean;
  studentId: any;
  action: any;
  dialogData : { data : LocalAddress ,  action: Action };

  constructor(
    private localAddressApiService: LocalAddressApiService,
    public studentActionService: StudentActionService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    ) { 
      this.activatedRoute.queryParams.subscribe((data) => {
        if (data && data.id) {
          this.studentId = data.id;
          this.action = data.action || Action.ADD
        }
      })
    }

  ngOnInit(): void {
    this.localAddressApiService.fetchLocalAddressByStudentId(this.studentId).subscribe(data =>{
      this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
        this.localAddressFormFields = formJson.localAddressForm;
        if(this.action === Action.UPDATE && !data || !data?._id){
          this.action = Action.ADD
        }
        this.dialogData = { data : data , action : this.action}
        this.prepareFormFields(data);
        setTimeout(() => {
          this.isFormLoading = false;
        }, 3000)
      });

    })
  }
  
  private prepareFormFields(parent) {
    const { data, action } = this.dialogData
    console.log("prepareFormFields");
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
    console.log("patchObjValuesToFormFields::before",obj);
    
    this.localAddressFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.localAddressFormFields.controls);
    console.log("patchObjValuesToFormFields::after",this.localAddressFormFields.controls);

  }

  onSubmit(formValues) {
    console.log("feeForm", formValues)
    formValues = {...formValues , studentId : this.studentId};
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
    this.localAddressApiService.addLocalAddress(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return 
    }, (error) => {
      console.log("error", error);
    })
  }

  private update(formValues){
    formValues.studentId = this.dialogData.data.studentId;
    this.localAddressApiService.updateLocalAddress(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return
    }, (error) => {
      console.log("error", error);
    })
  }

}


