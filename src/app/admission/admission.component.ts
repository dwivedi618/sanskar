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

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdmissionComponent implements OnInit, OnChanges {
  studentForm: FormGroup = this.fb.group({});
  parentForm: FormGroup = this.fb.group({});
  permanentAddressForm: FormGroup = this.fb.group({});
  localAddressForm: FormGroup = this.fb.group({});

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
      this.parentForm = this.jsonFormService.createForm(this.parentsFormFields.controls);
    }
    if (!changes.permanentAddressFormFields.firstChange) {
      this.permanentAddressForm = this.jsonFormService.createForm(this.permanentAddressFormFields.controls);
    }
    if (!changes.localAddressFormFields.firstChange) {
      this.localAddressForm = this.jsonFormService.createForm(this.localAddressFormFields.controls);
    }
  }

  ngOnInit() {
    this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
      console.log("admission form", formJson);

      this.admissionFormFields = formJson.studentForm;
      this.parentsFormFields = formJson.parentForm;
      this.permanentAddressFormFields = formJson.permanentAddressForm;
      this.localAddressFormFields = formJson.localAddressForm;

      this.studentForm = this.jsonFormService.createForm(this.admissionFormFields.controls);
      this.parentForm = this.jsonFormService.createForm(this.parentsFormFields.controls);
      this.permanentAddressForm = this.jsonFormService.createForm(this.permanentAddressFormFields.controls);
      this.localAddressForm = this.jsonFormService.createForm(this.localAddressFormFields.controls);

    });
  }

  onImageSelect(image, formFieldName, formName) {
    let form = this[formName];
    form.patchValue({ [formFieldName]: image });
  }
  getProfile() {
    this.commonService.getStudentRecordById(this.studentId)
      .subscribe((result) => {
        console.log("Student profile", result);
        this.studentData = result.data || null;
        if (this.action == 'update') {
          console.log("form patch prodifile ------------------");
        }

        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }
  onStudentSubmit() {
    console.log("studentForm", this.studentForm.value)

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
  onSubmitParentFormFields() {
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
  onSubmitPermanentAddressFormFields() {

  }

  onAdmissionComplete() {
    console.log("admission has been Completed navigating to student admission");
    this.router.navigate['studentcompletedetails'];
  }

  fetchValue(field: JsonFormControlsMethod): JsonFormControlOptions[] {
    const { hitHttp, method } = field;
    let shouldCallService: boolean = hitHttp && method ? true : false;
    if (!shouldCallService) return;
    if (!DYNAMIC_METHODS.includes(method)) {
      this.alertService.alertWithAction("METHOD NOT IMPLEMENTED", close);
      return
    }
    return this.commonService[field.method](field);

  }

  onSelectOption(event: { source: any, value: any }, actions: OptionsActions) {
    console.log(actions?.onSelect?.method, event)
    if (actions && actions?.onSelect && actions?.onSelect?.hitHttp && actions?.onSelect?.method) {
      const field: JsonFormControlsMethod = {
        hitHttp: actions.onSelect.hitHttp,
        method: actions.onSelect.method,
        value: event.value
      }
      this.fetchValue(field);
    }
  }

  onStudentFormSubmit(form){
    console.log("student form",form);
  }
}

