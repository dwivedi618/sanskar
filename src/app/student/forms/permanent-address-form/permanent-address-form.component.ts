
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { PermanentAddressApiService } from '../../services/permanent-address/permanent-address-api.service';
import { StudentActionService } from '../../services/student/student-action.service';
import { PermanentAddress } from '../../student.interface';

@Component({
  selector: 'app-permanent-address-form',
  templateUrl: './permanent-address-form.component.html',
  styleUrls: ['./permanent-address-form.component.scss']
})
export class PermanentAddressFormComponent implements OnInit {
  isFormLoading: boolean;
  permanentAddressFormFields: JsonFormData;
  isSaving: boolean;
  dialogData : { data : PermanentAddress , action: Action }
  action: Action;
  studentId: any;
  constructor(
    private permanentAddressApiService: PermanentAddressApiService,
    public studentActionService: StudentActionService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService,
    private activatedRoute : ActivatedRoute,
    private router : Router
    ) { 
      this.activatedRoute.queryParams.subscribe((data) => {
        if (data && data.id) {
          this.studentId = data.id;
          this.action = data.action || Action.ADD
        }
      })
    }

  ngOnInit(): void { 
    this.permanentAddressApiService.fetchPermanentAddrByStudentId(this.studentId).subscribe(data =>{
      this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
        this.permanentAddressFormFields = formJson.permanentAddressForm;
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
    
    this.permanentAddressFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.permanentAddressFormFields.controls);
    console.log("patchObjValuesToFormFields::after",this.permanentAddressFormFields.controls);

  }

  onSubmit(formValues) {
    console.log("feeForm", formValues)
    formValues = {...formValues ,studentId :  this.studentId };
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
    this.permanentAddressApiService.addPermanentAddress(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return 
    }, (error) => {
      console.log("error", error);
    })
  }

  private update(formValues){
    this.permanentAddressApiService.updatePermanentAddress(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return 
    }, (error) => {
      console.log("error", error);
    })
  }

}


