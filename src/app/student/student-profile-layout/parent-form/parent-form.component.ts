import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  // @Input() public data : { action : Action , data : Student};
  isFormLoading: boolean;
  admissionFormFields: JsonFormData;
  isSaving: boolean;

  constructor(
    private parentApiService: ParentApiService,
    public studentActionService: StudentActionService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService,
    private dialogRef : MatDialogRef<ParentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData : { data : Parent, action: Action }
    ) { }

  ngOnInit(): void {
    this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
      this.admissionFormFields = formJson.studentForm;
      setTimeout(() => {
        this.isFormLoading = false;
      }, 3000)
    });

    let studentId = this.dialogData.data.studentId;
    
    this.parentApiService.fetchParentByStudentId(studentId).subscribe(studentData =>{
      this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
        this.admissionFormFields = formJson.parentForm;
        this.prepareFormFields(studentData);
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
    
    this.admissionFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.admissionFormFields.controls);
    console.log("patchObjValuesToFormFields::after",this.admissionFormFields.controls);

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
    formValues.studentId = this.dialogData.data.studentId;
    this.parentApiService.addParent(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      console.log("error", error);
    })
  }

  private update(formValues){
    formValues.studentId = this.dialogData.data.studentId;
    this.parentApiService.updateParent(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      console.log("error", error);
    })
  }

}
