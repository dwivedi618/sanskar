import { ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentForm } from './admission';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { MatDialog } from '@angular/material/dialog'

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { UiService } from '../services/ui.service';
import { AlertService } from '../services/alert.service';
import { admissionFormFields } from './admissionFormFields';
import { COMMON_CONFIG } from '../config/commonConfig';
import { JsonFormService } from '../services/json-form.service';
import { JsonFormControlOptions, JsonFormControls, JsonFormData } from '../layouts/shared/json-form/json-from.types';
export interface DialogData {
  animal: string;
  name: string;
}
interface BloodGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdmissionComponent implements OnInit {
  animal: string;
  name: string;
  admission: StudentForm;
  applicationNumber = 1;
  studentForm: FormGroup = this.fb.group({});
  parentForm: FormGroup;
  addressForm: FormGroup;
  otherForm: FormGroup;
  registerForm: FormGroup;

  submitted = false;
  imagePreview = '';
  student: any;
  route = 'student/register-student';
  local_data: any;
  action: any;
  parents: any;
  studentId: any;
  standards: any;
  isLoading: boolean;
  studentData: any;

  admissionFormFields: JsonFormData;
  commonConfig = COMMON_CONFIG
  parentsFormFields: JsonFormData;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public commonService: CommonService,
    private alertService: AlertService,
    private uiService: UiService,
    private jsonFormService: JsonFormService

  ) {


    this.activatedRoute.queryParams.subscribe((data) => {

      if (data && data.action === 'update') {
        this.action = data.action;
        this.studentId = data.id;
        this.getProfile();
      } else {
        this.action = data.action || 'add';
      }
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.admissionFormFields.firstChange) {
      this.studentForm = this.jsonFormService.createForm(this.admissionFormFields.controls);
    }
    if (!changes.parentsFormFields.firstChange) {
      this.studentForm = this.jsonFormService.createForm(this.parentsFormFields.controls);
    }
  }

  ngOnInit() {
    this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
      console.log("admission form", formJson)
      this.admissionFormFields = formJson.studentForm;
      this.parentsFormFields = formJson.parentForm;
      this.studentForm = this.jsonFormService.createForm(this.admissionFormFields.controls);
      this.parentForm = this.jsonFormService.createForm(this.parentsFormFields.controls);

    });
  }
  getProfile() {
    this.commonService.getStudentRecordById(this.studentId)
      .subscribe((result) => {
        console.log("Student profile", result);
        this.studentData = result.data || null;
        if (this.action == 'update') {
          console.log("form patch prodifile ------------------");

          // this.studentFormPatch( this.studentData['standard']);
          // this.parentFormPatch( this.studentData['parents']);
          // this.addressFormPatch( this.studentData['address'][0],this.studentData['address'][1]);
        }

        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  } 
  onStudentSubmit() {
    console.log("studentForm", this.studentForm.value)
    this.submitted = true;

    //     // stop here if form is invalid
    if (this.studentForm.invalid) {
      console.log("studentForm Invalid");
      return;
    }


    // this.studentForm.patchValue({ image : this.imagePreview })
    console.log("Before submitstudent", this.studentForm.value);
    if (this.action === 'update') {
      this.commonService.updateStudentRecord(this.studentForm.value, this.studentId)
        .subscribe((result) => {
          this.studentId = result.data.id;
          this.alertService.alertComponent(result.message || '')
          console.log("result", result);
        }, (error) => {
          console.log("error", error);
          this.uiService.openSnackBar(error.statusText, null);
        });

    } else {
      this.commonService.studentRecord(this.studentForm.value)
        .subscribe((result) => {
          this.studentId = result.data.id;
          this.alertService.alertComponent(result.message || '')
          console.log("result", result);
        }, (error) => {
          console.log("error", error);
          this.uiService.openSnackBar(error.statusText, null);
        });
    }
  }
  onParentSubmit() {
    this.parentForm.value.requestType = "parent";
    console.log("studentId ", this.studentId);
    console.log("Before submitparent", this.parentForm.value);
    if (this.action == 'update') {
      this.commonService.updateParentRecord(this.studentId, this.parentForm.value)
        .subscribe((result) => {
          console.log("result", result);
          this.alertService.alertComponent(result.message || '');
        }, (error) => {
          console.log("error", error);
        });
    } else {
      this.commonService.parentRecord(this.studentId, this.parentForm.value)
        .subscribe((result) => {
          console.log("result", result);
          this.alertService.alertComponent(result.message || '');
        }, (error) => {
          console.log("error", error);
        });
    }

  }
  onAddressSubmit() {
    this.addressForm.value.requestType = "address"
    let address = [
      this.addressForm.get(['localAddress']).value,
      this.addressForm.get(['permanentAddress']).value
    ]
    console.log("before permanent Address ", this.addressForm.get(['permanentAddress']).value);
    console.log("before local Address ", this.addressForm.get(['localAddress']).value);
    if (this.action === 'update') {
      this.commonService.updateStudentAddress(this.studentId, address)
        .subscribe((result) => {
          console.log("result", result);
          this.alertService.alertComponent(result.message || '');
        }, (error) => {
          console.log("error", error);
        });
    } else {
      this.commonService.studentAddress(this.studentId, address)
        .subscribe((result) => {
          console.log("result", result);
          this.alertService.alertComponent(result.message || '');
        }, (error) => {
          console.log("error", error);
        });
    }
  }

  onAdmissionComplete() {
    console.log("admission has been Completed navigating to student admission");
    this.router.navigate['studentcompletedetails'];
  }

  fetchValue(field: JsonFormControls): JsonFormControlOptions[] {
    if (!(field.hitHttp && field.method)) {
      return
    }
    switch (field.method) {
      case "getClasses":
        this.commonService.getClassesForFormOptions(field.method);
        break
      default:
        alert("Method not found")
    }
  }

}

