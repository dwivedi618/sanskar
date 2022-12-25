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
  }



  ngOnInit() {
    this.jsonFormService.getAdmissionFormJson().subscribe(formJson => {
      console.log("admission form", formJson)
      this.admissionFormFields = formJson;
      this.studentForm = this.jsonFormService.createForm(this.admissionFormFields.controls);
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


  getStandardList() {
    console.log("get Standard List")
    this.commonService.getMasterStandard().subscribe((result) => {
      console.log("result", result);
      this.standards = result.data || null;
    }, (error) => {
      console.log("error", error);
    })
  }

  fileUploadReset() {
    if (this.imagePreview) {
      this.imagePreview = '';
      this.studentForm.value.image = '';
    }
  }
  getProfilePicObject() {
    if (this.imagePreview) {
      return {
        image: this.imagePreview,
        width: 150,
        alignment: 'right'
      };
    }
    return null;
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.imagePreview = reader.result as string;
      this.studentForm.patchValue({ image: reader.result as string })
      // this.studentForm.patchValue({ firstName : "heloo"})

    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
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
  async generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition).print();
    //     pdfDocGenerator.getDataUrl((dataUrl) => {
    // 	const targetElement = document.querySelector('#iframeContainer');
    // 	const iframe = document.createElement('iframe');
    // 	iframe.src = dataUrl;
    // 	targetElement.appendChild(iframe);
    // });
  }
  getDocumentDefinition() {

    return {
      content: [
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Logo Here',
              fontSize: 30,
              fit: [100, 100],
              alignment: 'center',
            },
            [
              {
                // % width
                width: '*',
                text: 'Sanskar',
                alignment: 'center',
                bold: true,
                color: '#222',
                fontSize: 35,
                margin: [0, 0, 0, 0]
              },
              {
                // % width
                width: '*',
                text: 'Public School',
                alignment: 'center',
                bold: true,
                color: '#222',
                fontSize: 15,
                // margin: [0, 0, 0, 20]
              },
              {
                // % width
                width: '*',
                text: 'Janjirha,Deoria(U.P)',
                alignment: 'center',
                bold: true,
                color: '#222',
                fontSize: 10,
                // margin: [0, 0, 0, 20]
              },
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',
        },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] },

        {

          text: 'Admission Form',
          bold: true,
          color: '#222',
          fontSize: 16,
          alignment: 'center',
          margin: [6, 6, 6, 6]
        },
        // -----------------------
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Application No. :' + this.applicationNumber,
              style: 'input',

            },
            [
              {
                // % width
                width: '*',
                text: this.studentForm.value.dateOfBirth,
                style: 'data',
                fit: [150, 150],
              },
              [
                this.getProfilePicObject(),
              ],
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',
        },
        // -----------------------
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Name of the Candidate :',
              style: 'input',

            },
            [
              {
                // % width
                width: '*',
                text: this.studentForm.value.firstName + ' ' + this.studentForm.value.middleName + ' ' + this.studentForm.value.lastName,
                style: 'data',
              },
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',

        },
        // -----------------------
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Gender :',
              style: 'input',

            },
            [
              {
                // % width
                width: '*',
                text: this.studentForm.value.gender,
                style: 'data',
              },
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',
        },
        // -----------------------
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              text: 'Date of Birth :',
              width: '*',
              style: 'input',

            },
            [
              {
                // % width
                text: this.studentForm.value.dateOfBirth,
                width: '*',
                style: 'data',
              },
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',
        },
        // -----------------------
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: "Father's Name :",
              style: 'input',

            },
            [
              {
                // % width
                width: '*',
                text: this.parentForm.value.fatherName,
                style: 'data',
              },
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',
        },
        // -----------------------
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: "Mother's Name :",
              style: 'input',

            },
            [
              {
                // % width
                width: '*',
                text: this.parentForm.value.motherName,
                style: 'data',
              },
            ],
          ],
          // optional space between columns
          // columnGap: 10,
          // decoration:'underline',
        },
        // -----------------------
        {
          columns: [
            {
              text: "Father's Education :",
              width: '*',
              style: 'input',
            },
            {
              text: this.parentForm.value.fatherEducation,
              width: '*',
              style: 'input',
            },
            [

              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "Occupation :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.parentForm.value.fatherOccupation,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------

              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "District :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.district,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------
              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "State :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.state,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------
              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "Post :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.post,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------
            ],
          ]
        },
        // ---------------------

        {
          columns: [
            {
              text: "Permanent Address :",
              width: '*',
              style: 'input',
            },
            [

              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "Village :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.village,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------

              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "District :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.district,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------
              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "State :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.state,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------
              {
                columns: [
                  {
                    // auto-sized columns have their widths based on their content
                    width: '*',
                    text: "Post :",
                    style: 'input',

                  },
                  [
                    {
                      // % width
                      width: '*',
                      text: this.addressForm.get(['permanentAddress']).value.post,
                      style: 'data',
                    },
                  ],
                ],
                // optional space between columns
                // columnGap: 10,
                // decoration:'underline',
              },
              // -----------------------
            ],
          ]
        },
        // ---------------------

        // ---------------------------------
      ],//content Ends
      styles: {
        input: {
          fontSize: 16,
          bold: true,
          lineWidth: 3,
          color: '#222',
          margin: [0, 10, 0, 0],
        },
        data: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
          decoration: 'underline',
          decorationStyle: 'dotted',
          italics: true,
        },
        alignRight: {

          alignment: 'right'
        },
        alignLeft: {

          alignment: 'left'
        }

      }
    };//return ends
  }//document definition ends
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

