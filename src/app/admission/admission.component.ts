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
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';

const registrationSteps = [
  {
    state : 'student',
    index : 1,
    label : "Student's Basic Information",
    icon : 'account_circle',
    html :" <h1>Hello Mo</h1>",
    component : '<app-student-form></app-student-form>'
  },
  {
    state : 'parent',
    index : 2,
    label : "Parent's Information",
    icon : 'group',
    html :" <h1>Hello Mo</h1>",
    component : '<app-parent-form></app-parent-form>'
  },
  {
    state : 'localAddress',
    index : 3,
    label : "Local Address",
    icon : 'location',
    html :" <h1>Hello Mo</h1>",
    component : '<app-local-address-form></app-local-address-form>'
  },
  {
    state : 'permanentAddress',
    index : 4,
    label : "Permanent Address",
    icon : 'map',
    html :" <h1>Hello Mo</h1>",
    component : '<app-permanent-address-form></app-permanent-address-form>'
  }
]

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent implements OnInit {
  admissionSteps: any;
  steps = registrationSteps;
  constructor(
    public dialog: MatDialog,
    public commonService: CommonService,
    public studentApiService: StudentApiService,
    public mileStoneService : MileStoneService,
  ) {
    this.mileStoneService.studentRegistrationMileStone.subscribe(
      steps =>{

      console.log(steps,"steps")
      this.admissionSteps = steps
        console.log("admission Steps",this.admissionSteps)
      }
    );
  }

  ngOnInit() {
    console.log("steps arrayy^^^^^^^^^^^",this.steps)
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
  selectionChange(step){
    console.log("step",step)
  }
}

