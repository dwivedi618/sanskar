import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { StudentActionService } from '../../services/student/student-action.service';
import { StudentApiService } from '../../services/student/student-api.service';
import { Student } from '../../students-list/students-list.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  // @Input() public data : { action : Action , data : Student};
  isFormLoading: boolean;
  admissionFormFields: JsonFormData;
  isSaving: boolean;

  constructor(
    private studentApiService: StudentApiService,
    public studentActionService: StudentActionService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService,
    private dialogRef : MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData : { data : Student, action: Action }
    ) { }

  ngOnInit(): void {

    // this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
    //   this.admissionFormFields = formJson.studentForm;
    //   setTimeout(() => {
    //     this.isFormLoading = false;
    //   }, 3000)
    // });
    this.studentApiService.studentData.subscribe(studentData =>{
      this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
        this.admissionFormFields = formJson.studentForm;
        this.prepareFormFields(studentData);
        setTimeout(() => {
          this.isFormLoading = false;
        }, 3000)
      });

    })
  }
  
  onStudentFormSubmit(form:Student) {
    console.log("student form", form);
    this.dialogData = this.dialogData;
    form.studentId = this.dialogData.data._id;
    
    this.studentApiService.update(form).subscribe(result =>{
      this.studentActionService.hideStudentForm();
    })
  }

  private prepareFormFields(studentData) {
    const { data, action } = this.dialogData
    console.log("prepareFormFields",this.dialogData);
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
    this.admissionFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.admissionFormFields.controls);
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
    formValues.studentId = this.dialogData.data._id;
    this.studentApiService.add(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      console.log("error", error);
    })
  }

  private update(formValues){
    formValues.studentId = this.dialogData.data._id;
    this.studentApiService.update(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      console.log("error", error);
    })
  }

}
