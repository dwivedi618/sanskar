
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonFormControls, JsonFormData } from 'src/app/layouts/shared/json-form/json-from.types';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { ParentApiService } from '../../services/parent/parent-api.service';
import { PermanentAddressApiService } from '../../services/permanent-address/permanent-address-api.service';
import { StudentActionService } from '../../services/student/student-action.service';
import { LocalAddress, Parent, PermanentAddress } from '../../student.interface';

@Component({
  selector: 'app-permanent-address-form',
  templateUrl: './permanent-address-form.component.html',
  styleUrls: ['./permanent-address-form.component.scss']
})
export class PermanentAddressFormComponent implements OnInit {
  // @Input() public data : { action : Action , data : Student};
  isFormLoading: boolean;
  admissionFormFields: JsonFormData;
  isSaving: boolean;

  constructor(
    private permanentAddressApiService: PermanentAddressApiService,
    public studentActionService: StudentActionService,
    private alertService : AlertService,
    private jsonFormService : JsonFormService,
    private dialogRef : MatDialogRef<PermanentAddressApiService>,
    @Inject(MAT_DIALOG_DATA) public dialogData : { data : PermanentAddress | LocalAddress, action: Action }
    ) { }

  ngOnInit(): void {

    let studentId = this.dialogData.data.studentId;
    
    this.permanentAddressApiService.fetchPermanentAddrByStudentId(studentId).subscribe(studentData =>{
      this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
        this.admissionFormFields = formJson.permanentAddressForm;
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
    this.permanentAddressApiService.addPermanentAddress(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      console.log("error", error);
    })
  }

  private update(formValues){
    formValues.studentId = this.dialogData.data.studentId;
    this.permanentAddressApiService.updatePermanentAddress(formValues).subscribe((result) => {
      this.alertService.alertComponent(result.message);
      return this.dialogRef.close();
    }, (error) => {
      console.log("error", error);
    })
  }

}


