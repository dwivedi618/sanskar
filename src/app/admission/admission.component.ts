import { ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { UiService } from '../services/ui.service';
import { AlertService } from '../services/alert.service';

import { JsonFormService } from '../services/json-form.service';
import { JsonFormControlOptions, JsonFormControls, JsonFormControlsMethod, JsonFormData, OptionsActions } from '../layouts/shared/json-form/json-from.types';
import { Observable } from 'rxjs';
import { DYNAMIC_METHODS, METHODS } from './dropdown.methods';
import { StudentApiService } from '../student/services/student/student-api.service';
import { Student } from '../student/student.interface';
import { MileStoneService } from '../services/mile-stone.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent implements OnInit {


  action: any;
  parents: any;
  studentId: any;
  standards: any;
  isLoading: boolean;
  studentData: any;

  admissionFormFields: JsonFormData;

  parentsFormFields: JsonFormData;
  filteredOptions: Observable<JsonFormControlOptions[]>;
  permanentAddressFormFields: JsonFormData;
  localAddressFormFields: JsonFormData;
  isFormLoading = true;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public commonService: CommonService,
    public studentApiService: StudentApiService,
    public mileStoneService : MileStoneService,
    private alertService : AlertService,
    private jsonFormService: JsonFormService

  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data && data.action === 'update') {
        this.action = data.action;
        this.studentId = data.id;
        this.getProfile();
      } else {
        this.action = data.action;
      }
    })
    this.mileStoneService.studentRegistrationMileStone.subscribe(console.log);
    
  }



  ngOnInit() {
    this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
      this.admissionFormFields = formJson.studentForm;
      this.parentsFormFields = formJson.parentForm;
      this.permanentAddressFormFields = formJson.permanentAddressForm;
      this.localAddressFormFields = formJson.localAddressForm;
      setTimeout(() => {
        this.isFormLoading = false;
      }, 3000)
    });
  }

  onImageSelect(image, formFieldName, formName) {
    let form = this[formName];
    form.patchValue({ [formFieldName]: image });
  }
  getProfile() {
    this.studentApiService.fetchStudentCompleteProfileByStudentId(this.studentId)
      .subscribe((result) => {
        let [student,parent,address] = result || [];

        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }


  onStudentFormSubmit(form:Student) {
    console.log("student form", form);
    this.studentApiService.add(form).subscribe(result =>{
      console.log("save student",result);
    })
  }
  onSubmitParentFormFields(form){
    console.log("parent form", form);
  }
  onSubmitPermanentAddressFormFields(form){
    console.log("permanent address form", form);

  }
  onSubmitLocalAddressFormFields(form){
    console.log("local address  form", form);
    
  }
}

