import { Component, Input, OnInit } from '@angular/core';
import { JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { JsonFormService } from 'src/app/services/json-form.service';
import { StudentApiService } from '../../services/student-api.service';
import { Student } from '../../students-list/students-list.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  @Input() public data : { action : Action , data : Student};
  isFormLoading: boolean;
  admissionFormFields: JsonFormData;
  isSaving: boolean;

  constructor(
    private studentApiService: StudentApiService,
    private jsonFormService : JsonFormService
    ) { }

  ngOnInit(): void {

    this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
      this.admissionFormFields = formJson.studentForm;
      setTimeout(() => {
        this.isFormLoading = false;
      }, 3000)
    });
    this.studentApiService.studentData.subscribe(studentData =>{
      console.log("studentData",studentData);
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
    this.studentApiService.add(form).subscribe(result =>{
      console.log("save student",result);
    })
  }

  private prepareFormFields(studentData) {
    const { data, action } = this.data
    console.log("prepareFormFields",this.data);
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
    console.log("this.admissionFormFields",this.admissionFormFields)
    this.admissionFormFields.controls = this.jsonFormService.patchValuesToFormFields(obj,this.admissionFormFields.controls);
  }

  onSubmit(formValues) {
    console.log("feeForm", formValues)
    let form = formValues;
    let action : Action = this.data?.action;
    switch (action) {
      case Action.ADD:
        this.add(formValues);
        break;
      case Action.EDIT:
      case Action.UPDATE:
        let {_id } = this.data.data
        return this.update({...formValues,_id});

      default:
        break;
    }
    this.isSaving = true;

  }

  private add(formValues){
    // this.commonService.addMasterFeeCategory(formValues).subscribe((result) => {
    //   console.log("masterFeeCategoryForm", result);
    //   this.isSaving = true;
    //   this.alertService.alertComponent(result.message);
    //   this.feeDialogRef.close();
    // }, (error) => {
    //   console.log("masterFeeCategoryForm", error);
    //   this.isSaving = true;
    // })
  }

  private update(formValues){
    // this.commonService.updateMasterFeeCategory(formValues).subscribe((result) => {
    //   console.log("updateMasterFeeCategory", result);
    //   this.isSaving = true;
    //   this.alertService.alertComponent(result.message);
    //   return this.feeDialogRef.close();
    // }, (error) => {
    //   console.log("updateMasterFeeCategory", error);
    //   this.isSaving = true;
    // })
  }

}
