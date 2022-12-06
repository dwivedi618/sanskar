import { Inject, ViewChild, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentForm } from './admission';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { UiService } from '../services/ui.service';
import { AlertService } from '../services/alert.service';
import { admissionFormFields } from './admissionFormFields';
import { COMMON_CONFIG } from '../config/commonConfig';


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
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {
  animal: string;
  name: string;
  admission: StudentForm;
  applicationNumber = 1;
  studentForm: FormGroup;
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
  studentData : any;

  admissionFormFields = admissionFormFields;
  commonConfig = COMMON_CONFIG

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private alertService: AlertService,
    private uiService: UiService,
 
  ) {
    
    
    this.activatedRoute.queryParams.subscribe((data)=>{
      console.log("activated route data-----------",data);
      
      if(data && data.action === 'update'){
      console.log("profile data update-----------",data);
        this.action = data.action;
        this.studentId = data.id;
        this.getProfile();
      }else{
        this.action = data.action || 'add';
      }
    })

  }

  ngOnInit() {
    this.getStandardList();
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [],
      dateOfBirth: [],
      image: [],
      nationality: ['Indian'],
      healthStatus: [],
      bloodGroup: [],
      standardId: ['', Validators.required],//admission In
      convenience: ['', Validators.required],
      place: []
    });
    this.parentForm = this.formBuilder.group({
      studentId: [],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      fatherEducation: [''],
      fatherOccupation: [''],
      motherEducation: [''],
      motherOccupation: [''],
      parentContact: [''],
      guardianName: ['', Validators.required],
      guardianContact: ['', Validators.required]
    });
    this.addressForm = this.formBuilder.group({
      permanentAddress: this.formBuilder.group({
        addressType : ['PERMANENT'],
        village: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        post: ['', Validators.required],
        pin: ['', Validators.required]

      }),
      localAddress: this.formBuilder.group({
        addressType : ['LOCAL'],
        village: [''],
        district: [''],
        state: [''],
        post: [''],
        pin: ['']

      })

    });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.registerForm.controls; }
  get f1() { return this.studentForm.controls; }
  get f2() { return this.parentForm.controls; }

  get f3() { return this.addressForm.get(['permanentAddress'])['controls']; }//for accessing nested form permanentAddress
  get f4() { return this.addressForm.get(['localAddress'])['controls']; }//for accessing nested form localAddress

  getProfile(){
    this.commonService.getStudentRecordById(this.studentId)
      .subscribe((result) => {
        console.log("Student profile", result);
        this.studentData = result.data || null;
        if(this.action == 'update'){
    console.log("form patch prodifile ------------------");

          this.studentFormPatch( this.studentData['standard']);
          this.parentFormPatch( this.studentData['parents']);
          this.addressFormPatch( this.studentData['address'][0],this.studentData['address'][1]);
        }

        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }



  studentFormPatch(standard){
    console.log("form patch prodifile ------------------");
    
    this.studentForm.patchValue({ firstName : this.studentData.name || '' });
    this.studentForm.patchValue({ middleName : this.studentData.name || '' });
    this.studentForm.patchValue({ lastName : this.studentData.name || '' });

    this.studentForm.patchValue({ gender : this.studentData.gender  || ''});
    this.studentForm.patchValue({ dateOfBirth : this.studentData.dateOfBirth  || ''});
    // this.studentForm.patchValue({ image : this.studentData.image || '' });
    this.studentForm.patchValue({ nationality : this.studentData.nationality  || ''});
    this.studentForm.patchValue({ healthStatus : this.studentData.healthStatus || '' });
    this.studentForm.patchValue({ bloodGroup : this.studentData.bloodGroup || '' });
    this.studentForm.patchValue({ standardId : standard.id || '' });
    this.studentForm.patchValue({ convenience : this.studentData.convenience || '' });
    this.studentForm.patchValue({ place : this.studentData.place  || ''}); 
}
  /**
   * @use patch parent data in parentForm 
   * @param data parents data {}
   */
  parentFormPatch(data){
    this.parentForm.patchValue({ studentId : this.studentId  }); 
    this.parentForm.patchValue({ fatherName : data.fatherName || '' }); 
    this.parentForm.patchValue({ motherName : data.motherName || '' }); 
    this.parentForm.patchValue({ fatherEducation : data.fatherEducation || '' }); 
    this.parentForm.patchValue({ fatherOccupation : data.fatherOccupation || '' }); 
    this.parentForm.patchValue({ motherEducation : data.motherEducation || '' }); 
    this.parentForm.patchValue({ motherOccupation : data.motherOccupation || '' }); 
    this.parentForm.patchValue({ parentContact : data.parentContact || '' }); 
    this.parentForm.patchValue({ guardianName : data.guardianName || '' });
    this.parentForm.patchValue({ guardianContact : data.guardianContact || '' }); 
}

/**
 * 
 * @param address1 permanetAddress
 * @param address2 localAddress
 */
  addressFormPatch(address1,address2){
    this.addressForm.get(['permanentAddress']).patchValue({ village : address1.village });
    this.addressForm.get(['permanentAddress']).patchValue({ district : address1.district });
    this.addressForm.get(['permanentAddress']).patchValue({ state : address1.state });
    this.addressForm.get(['permanentAddress']).patchValue({ post : address1.post });
    this.addressForm.get(['permanentAddress']).patchValue({ pin : address1.pin });
    this.addressForm.get(['permanentAddress']).patchValue({ addressType : address1.addressType });


    this.addressForm.get(['localAddress']).patchValue({ village : address2.village });
    this.addressForm.get(['localAddress']).patchValue({ district : address2.district });
    this.addressForm.get(['localAddress']).patchValue({ state : address2.state });
    this.addressForm.get(['localAddress']).patchValue({ post : address2.post });
    this.addressForm.get(['localAddress']).patchValue({ pin : address2.pin });
    this.addressForm.get(['localAddress']).patchValue({ addressType : address2.addressType });

}

/**
 * @use dropdown list of all standard (classes)
 */
getStandardList(){
  console.log("get Standard List")
  this.commonService.getMasterStandard().subscribe((result)=>{
    console.log("result",result);
    this.standards = result.data || null;
  },(error)=>{
    console.log("error",error);
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
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result as string;
    // }
    // reader.readAsDataURL(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.imagePreview = reader.result as string;
      // this.studentForm.patchValue({ image : reader.result as string})
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  onStudentSubmit() {
    console.log("studentForm",this.studentForm.value)
    this.submitted = true;

    //     // stop here if form is invalid
    if (this.studentForm.invalid) {
      console.log("studentForm Invalid");
      return;
    }

    this.studentForm.value.requestType = "student";
    // this.studentForm.patchValue({ image : this.imagePreview })
    console.log("Before submitstudent", this.studentForm.value);
    if(this.action === 'update'){
      this.commonService.updateStudentRecord(this.studentForm.value,this.studentId)
      .subscribe((result) => {
        this.studentId = result.data.id;
        this.alertService.alertComponent(result.message || '')
        console.log("result", result);
      }, (error) => {
        console.log("error", error);
        this.uiService.openSnackBar(error.statusText, null);
      });
    
    }else{
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
    if(this.action == 'update'){
      this.commonService.updateParentRecord(this.studentId, this.parentForm.value)
      .subscribe((result) => {
        console.log("result", result);
        this.alertService.alertComponent(result.message || '');
      }, (error) => {
        console.log("error", error);
      });
    }else{
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
    if(this.action === 'update'){
      this.commonService.updateStudentAddress(this.studentId, address)
      .subscribe((result) => {
        console.log("result", result);
        this.alertService.alertComponent(result.message || '');
      }, (error) => {
        console.log("error", error);
      });
    }else{
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



  bloodGroups: BloodGroup[] = [
    { value: 'A+', viewValue: 'A+' },
    { value: 'A-', viewValue: 'A-' },
    { value: 'B+', viewValue: 'B+' },
    { value: 'B-', viewValue: 'B-' },
    { value: 'AB+', viewValue: 'AB+' },
    { value: 'AB-', viewValue: 'AB' },
    { value: 'O+', viewValue: 'O+' },
    { value: 'O-', viewValue: 'O-' }
  ];

}

// @Component({
//   selector: 'DialogOverviewExampleDialog',
//   templateUrl: 'dialog-overview-example-dialog',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }