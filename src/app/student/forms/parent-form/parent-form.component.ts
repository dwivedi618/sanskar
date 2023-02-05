import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { ParentApiService } from '../../services/parent/parent-api.service';
import { StudentActionService } from '../../services/student/student-action.service';
import { Parent } from '../../student.interface';
import { Student } from '../../students-list/students-list.component';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss']
})
export class ParentFormComponent implements OnInit {
  isFormLoading: boolean;
  parentFormFields: JsonFormData;
  isSaving: boolean;
  studentId: any;
  dialogData: { data: Parent; action: Action; };
  action: Action;
  IfNoParentIdMsg = "Looks Like Parent Information was not added. Need to add as new!"

  constructor(
    private parentApiService: ParentApiService,
    public studentActionService: StudentActionService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService,
    private activatedRoute : ActivatedRoute
    ) { 
      this.activatedRoute.queryParams.subscribe((data) => {
        if (data && data.id) {
          this.studentId = data.id;
          this.action = data.action || Action.ADD
          console.log("In Parent Form", this.studentId)
        }
      })
    }

  ngOnInit(): void {
    this.parentApiService.fetchParentByStudentId(this.studentId).subscribe(data =>{
      console.log("parent data",data)
      this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
        this.parentFormFields = formJson.parentForm;
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
    
    this.parentFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.parentFormFields.controls);
    console.log("patchObjValuesToFormFields::after",this.parentFormFields.controls);

  }

  onSubmit(formValues) {
    console.log("", formValues)
    formValues = { ...formValues , studentId :  this.studentId} ;
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
    formValues.studentId = this.studentId;
    this.parentApiService.addParent(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
    }, (error) => {
      console.log("error", error);
    })
  }

  private update(formValues){
    formValues.studentId = this.dialogData.data.studentId;
    this.parentApiService.updateParent(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
    }, (error) => {
      console.log("error", error);
    })
  }

}
