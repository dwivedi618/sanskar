import { Inject, ViewChild, Optional} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentForm} from './admission';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.pdfMake.vfs;


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { UiService } from '../services/ui.service';

export interface DialogData {
  animal: string;
  name: string;
}
interface Standard {
  value: string;
  viewValue: string;
}
interface BloodGroup{
  value:string;
  viewValue:string;
}


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  animal: string;
  name: string;
  admission: StudentForm;
  applicationNumber= 1;
  studentForm : FormGroup;
  parentForm : FormGroup;
  addressForm : FormGroup;
  otherForm : FormGroup;
  registerForm: FormGroup;
  
  submitted = false;
  imagePreview: any;
  student : any;
  route = 'student/register-student';  
  local_data:any;
  action: any;
  parents: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private uiService : UiService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any
    ) {
      this.local_data = data.obj;
      this.action = data.obj.action;
      if(data.obj.parent){
      this.parents = data.obj.parent;
      }else {this.parents = [null]}
      console.log("local_data :",this.local_data);
      console.log(" parents:",this.parents);

     }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: [this.local_data.firstName, Validators.required],
      middleName: [this.local_data.middleName],
      lastName: [this.local_data.lastName],
      gender: [this.local_data.gender],
      dateOfBirth: [this.local_data.dateOfBirth],
      image: [this.local_data.image],
      nationality : ['Indian'],
          healthStatus : [this.local_data.healthStatus],
          bloodGroup : [this.local_data.bloodGroup],
          standard : [this.local_data.standard,Validators.required],//admission In
          convenience : [this.local_data.convenience,Validators.required],
          place : [this.local_data.place]
    });
    this.parentForm = this.formBuilder.group({
      fatherName: [this.parents.fatherName, Validators.required],
          motherName: [this.parents.motherName, Validators.required],
          fatherEducation : [this.parents.fatherEducation],
          fatherOccupation : [this.parents.fatherOccupation],
          motherEducation : [this.parents.motherEducation],
          motherOccupation :[this.parents.motherOccupation],
          parentContact: [this.parents.parentContact],
          guardianName : [this.parents.guardianName, Validators.required],
          guardianContact :[this.parents.guardianContact, Validators.required]
    });
    this.addressForm = this.formBuilder.group({
      permanentAddress: this.formBuilder.group({
              village: ['',Validators.required],
              district: ['',Validators.required],
              state: ['',Validators.required],
              post: ['',Validators.required]
            }),
            localAddress: this.formBuilder.group({
              village: [''],
              district: [''],
              state: [''],
              post: ['']
            })

    });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.registerForm.controls; }
  get f1() { return this.studentForm.controls; }
  get f2() { return this.parentForm.controls; }

  get f3(){ return this.addressForm.get(['permanentAddress'])['controls']; }//for accessing nested form permanentAddress
  get f4(){ return this.addressForm.get(['localAddress'])['controls']; }//for accessing nested form localAddress
  
 

  fileUploadReset(){
if(this.imagePreview){
  this.imagePreview = '';
  this.studentForm.value.image = '';
}
  }
  getProfilePicObject() {
    if (this.imagePreview) {
      return {
        image: this.imagePreview,
        width: 150,
        alignment : 'right'
      };
    }
    return null;
  }
  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.getBase64(file);
    this.studentForm.patchValue({image : file});
    this.studentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
    getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.imagePreview = reader.result as string;
      // this.studentForm.value.image = this.imagePreview;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  onStudentSubmit(){
    this.submitted = true;

    //     // stop here if form is invalid
        if (this.studentForm.invalid) {
            return;
            console.log("form Invalid");
        }
       
        this.studentForm.value.requestType = "student";
        this.studentForm.value.image = this.imagePreview;
        console.log("Before submitstudent",this.studentForm.value);
        this.commonService.postData(this.route,this.studentForm.value)
          .subscribe((result) => {
            this.student = result.result;
            this.uiService.openSnackBar(result.firstName,null);
            console.log("result",result);
          },(error) => {
            console.log("error",error);
            this.uiService.openSnackBar(error.message,null);
          });
  }
  onParentSubmit(){
    this.parentForm.value.requestType = "parent";
    this.parentForm.value.studentID = this.student.id;
    console.log("studentId from Student",this.student);

    console.log("Before submitparent",this.parentForm.value);
    this.commonService.postData(this.route,this.parentForm.value)
          .subscribe((result) => {
            
            console.log("result",result);
          },(error) => {
            console.log("error",error);
          });

  }
  onAddressSubmit(){
    this.addressForm.value.requestType = "address";
    this.addressForm.value.studentID = this.student.id;

    console.log("before permanent Address ",this.addressForm.get(['permanentAddress']).value);
    console.log("before local Address ",this.addressForm.get(['localAddress']).value);
    this.commonService.postData(this.route,this.addressForm.value)
          .subscribe((result) => {
            
            console.log("result",result);
          },(error) => {
            console.log("error",error);
          });
  }
 onAdmissionComplete(){
   console.log("admission has been Completed navigating to student admission");
   this.router.navigate['studentcompletedetails'];
 }
 async generatePdf(){
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
            text:'Logo Here',
            fontSize:30,
            fit:[100,100],          
            alignment: 'center',
          },
         [
          {            
            // % width
            width:'*',
            text: 'Sanskar',
            alignment: 'center',
            bold: true,
            color: '#222',
            fontSize: 35,
            margin: [0, 0, 0, 0]
          },
          {            
            // % width
            width:'*',
            text: 'Public School',
            alignment: 'center',
            bold: true,
            color: '#222',
            fontSize: 15,
            // margin: [0, 0, 0, 20]
          },
          {            
            // % width
            width:'*',
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
      {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 2 }]},
      
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
          text:'Application No. :'+this.applicationNumber,
          style:'input',
          
        },
       [
        {            
          // % width
          width:'*',
          text: this.studentForm.value.dateOfBirth,
          style:'data',
          fit:[150,150]   ,  
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
          text:'Name of the Candidate :',
          style:'input',
          
        },
       [
        {            
          // % width
          width:'*',
          text: this.studentForm.value.firstName+' '+ this.studentForm.value.middleName+' '+ this.studentForm.value.lastName,
          style:'data',     
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
          text:'Gender :',
          style:'input',
          
        },
       [
        {            
          // % width
          width:'*',
          text: this.studentForm.value.gender,
          style:'data',     
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
          text:'Date of Birth :',
          width: '*',
          style:'input',
          
        },
       [
        {            
          // % width
          text: this.studentForm.value.dateOfBirth,
          width:'*',
          style:'data',     
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
          text:"Father's Name :",
          style:'input',
          
        },
       [
        {            
          // % width
          width:'*',
          text: this.parentForm.value.fatherName,
          style:'data',     
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
          text:"Mother's Name :",
          style:'input',
          
        },
       [
        {            
          // % width
          width:'*',
          text: this.parentForm.value.motherName,
          style:'data',     
        },
       ],
      ],
      // optional space between columns
      // columnGap: 10,
      // decoration:'underline',
    },
    // -----------------------
    {
      columns:[
      {
        text:"Father's Education :",
        width: '*',
        style:'input',
      },
      {
        text:this.parentForm.value.fatherEducation,
        width: '*',
        style:'input',
      },
      [
        
        { 
          columns: [   
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text:"Occupation :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.parentForm.value.fatherOccupation,
              style:'data',     
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
              text:"District :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.district,
              style:'data',     
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
              text:"State :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.state,
              style:'data',     
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
              text:"Post :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.post,
              style:'data',     
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
      columns:[
      {
        text:"Permanent Address :",
        width: '*',
        style:'input',
      },
      [
        
        { 
          columns: [   
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text:"Village :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.village,
              style:'data',     
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
              text:"District :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.district,
              style:'data',     
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
              text:"State :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.state,
              style:'data',     
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
              text:"Post :",
              style:'input',
              
            },
           [
            {            
              // % width
              width:'*',
              text: this.addressForm.get(['permanentAddress']).value.post,
              style:'data',     
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
                    color:'#222',
                    margin:[0 ,10,0,0],
                },
                data: {
                  fontSize: 16,
                  bold: true,
                  margin:[0 ,10,0,0],
                  decoration: 'underline',
                  decorationStyle: 'dotted',
                  italics:true,
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

 
  standards: Standard[] = [
    {value: 'UKG', viewValue: 'UKG'},
    {value: 'LKG', viewValue: 'LKG'},
    {value: 'Standard1', viewValue: 'Standard 1'},
    {value: 'Standard2', viewValue: 'Standard 2'},
    {value: 'Standard3', viewValue: 'Standard 3'},
    {value: 'Standard4', viewValue: 'Standard 4'},
    {value: 'Standard5', viewValue: 'Standard 5'},
    {value: 'Standard6', viewValue: 'Standard 6'},
    {value: 'Standard7', viewValue: 'Standard 7'},
    {value: 'Standard8', viewValue: 'Standard 8'},
    {value: 'Standard9', viewValue: 'Standard 9'},
    {value: 'Standard11', viewValue: 'standard 11'}
   
  ];
  bloodGroups:BloodGroup[] = [
    {value:'A+' , viewValue : 'A+'},
    {value:'A-' , viewValue : 'A-'},
    {value:'B+' , viewValue : 'B+'},
    {value:'B-' , viewValue : 'B-'},
    {value:'AB+' , viewValue : 'AB+'},
    {value:'AB-' , viewValue : 'AB'},
    {value:'O+' , viewValue : 'O+'},
    {value:'O-' , viewValue : 'O-'}

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