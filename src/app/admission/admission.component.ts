import { Inject} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentForm} from './admission';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {FeesComponent } from "../fees/fees.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common.service';

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
  
  studentForm : FormGroup;
  parentForm : FormGroup;
  addressForm : FormGroup;
  otherForm : FormGroup;
  registerForm: FormGroup;
  
  submitted = false;
  imagePreview: any;
  

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
    ) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      gender: ['Male'],
      dateOfBirth: [''],
      image: [''],
      nationality : ['Indian'],
          healthStatus : [''],
          bloodGroup : [''],
          standard : ['',Validators.required],//admission In
          convenience : ['Yes',Validators.required],
          place : ['']
    });
    this.parentForm = this.formBuilder.group({
      fatherName: ['', Validators.required],
          motherName: ['', Validators.required],
          fatherEducation : [''],
          fatherOccupation : [''],
          motherEducation : [''],
          motherOccupation :[''],
          parentContact: [''],
          guardianName : ['', Validators.required],
          guardianContact :['', Validators.required]
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

      // this.registerForm = this.formBuilder.group({
      //   image: ['',Validators.required],
      //     firstName: ['', Validators.required],
      //     middleName: [''],
      //     lastName: [''],
      //     gender: ['Male'],
      //     dateOfBirth: [new Date()],
      //     fatherName: ['', Validators.required],
      //     motherName: ['', Validators.required],
      //     fatherEducation : [''],
      //     fatherOccupation : [''],
      //     motherEducation : [''],
      //     motherOccupation :[''],
      //     permanentAddress: this.formBuilder.group({
      //       village: ['',Validators.required],
      //       district: ['',Validators.required],
      //       state: ['',Validators.required],
      //       post: ['',Validators.required]
      //     }),
      //     localAddress: this.formBuilder.group({
      //       village: [''],
      //       district: [''],
      //       state: [''],
      //       post: ['']
      //     }),
      //     guardianName : ['', Validators.required],
      //     contactNumber :['', Validators.required,Validators.maxLength(10)],
      //     nationality : ['Indian'],
      //     healthStatus : [''],
      //     bloodGroup : [''],
      //     standard : ['',Validators.required],//admission In
      //     convenience : ['Yes'],
      //     place : ['']
           


      //     // email: ['', [Validators.required, Validators.email]],
      //     // password: ['', [Validators.required, Validators.minLength(6)]]
      // });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.registerForm.controls; }
  get f1() { return this.studentForm.controls; }
  get f2() { return this.parentForm.controls; }

  get f3(){ return this.addressForm.get(['permanentAddress'])['controls']; }//for accessing nested form permanentAddress
  get f4(){ return this.addressForm.get(['localAddress'])['controls']; }//for accessing nested form localAddress
  
 


  getProfilePicObject() {
    if (this.imagePreview) {
      return {
        image: this.imagePreview,
        width: 75,
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
        this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toLocaleDateString();
    console.log("Before submitstudent",this.studentForm.value);
  }
  onParentSubmit(){
    console.log("Before submitparent",this.parentForm.value);
  }
  onAddressSubmit(){
    console.log("before permanent Address ",this.addressForm.get(['permanentAddress']).value);
    console.log("before local Address ",this.addressForm.get(['localAddress']).value);
  }
 onAdmissionComplete(){
   console.log("admission has been Completed navigating to student admission");
   this.router.navigate['studentcompletedetails'];
 }
 async generatePdf(){
  const documentDefinition = this.getDocumentDefinition();
  pdfMake.createPdf(documentDefinition).open();
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
      
      
    { 
      
      text: 'Admission Form',
      bold: true,
      color: '#222',
      fontSize: 16,
      
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },
    
    
    
    {
    columns: [
      [{
        text: 'Name of the Candidate : ' + this.studentForm.value.firstName +' '+this.studentForm.value.middleName+' '+this.studentForm.value.lastName
      },
      {
        text: 'Gender: ' + this.studentForm.value.gender,
        style:'name'
      },
      {
        text: 'Date Of Birth : ' + this.studentForm.value.dateOfBirth
      },
      {
        text:"Father's Name :"+ this.parentForm.value.fatherName
      },
      {
        text:"Mother's Name :"+ this.parentForm.value.motherName
      },
      {
        text:"Father's Education :"+ this.parentForm.value.fatherEducation
      },
      {
        text:"Mother's Name :"+ this.parentForm.value.motherEducation
      },
      {
        text:"Permanent Address :"
      },
      {
        text:"Village :"+ this.addressForm.get(['permanentAddress']).value.village
      },
      {
        text:"District :"+ this.addressForm.get(['permanentAddress']).value.district
      },
      {
        text:"state :"+ this.addressForm.get(['permanentAddress']).value.state
      },
      {
        text:"Post :"+ this.addressForm.get(['permanentAddress']).value.post
      },
      {
        text:"Local Address :"
      },
      {
        text:"Village :"+ this.addressForm.get(['localAddress']).value.village
      },
      {
        text:"District :"+ this.addressForm.get(['localAddress']).value.district
      },
      {
        text:"state :"+ this.addressForm.get(['localAddress']).value.state
      },
      {
        text:"Post :"+ this.addressForm.get(['localAddress']).value.post
      },
      
      {
        text: 'Nationality : ' + this.studentForm.value.nationality
      },
      
      ] ,
      [
        this.getProfilePicObject()
      ],
      
     ]
    }],
    styles: {
      name: {
        fontSize: 30,
        bold: true
    }
  }
};
}
//  generatePdf(action = 'open') {
//   const documentDefinition = this.getDocumentDefinition();

//   switch (action) {
//     case 'open': pdfMake.createPdf(documentDefinition).open(); break;
//     case 'print': pdfMake.createPdf(documentDefinition).print(); break;
//     case 'download': pdfMake.createPdf(documentDefinition).download(); break;

//     default: pdfMake.createPdf(documentDefinition).open(); break;
//   }

// }

// getDocumentDefinition() {
//   sessionStorage.setItem('admission', JSON.stringify(this.admission));
//   return {
//     content: [
//       {
//         text: 'admission',
//         bold: true,
//         fontSize: 20,
//         alignment: 'center',
//         margin: [0, 0, 0, 20]
//       },
//       {
//         columns: [
//           [{
//             text: this.admission.name,
//             style: 'name'
//           },
//           {
//             text: this.admission.address
//           },
//           {
//             text: 'Email : ' + this.admission.email,
//           },
//           {
//             text: 'Contant No : ' + this.admission.contactNo,
//           },
//           {
//             text: 'GitHub: ' + this.admission.socialadmission,
//             link: this.admission.socialadmission,
//             color: 'blue',
//           }
//           ],
//           [
//             this.getadmissionPicObject()
//           ]
//         ]
//       },
//       {
//         text: 'Skills',
//         style: 'header'
//       },
//       {
//         columns : [
//           {
//             ul : [
//               ...this.admission.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
//             ]
//           },
//           {
//             ul : [
//               ...this.admission.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
//             ]
//           },
//           {
//             ul : [
//               ...this.admission.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
//             ]
//           }
//         ]
//       },
//       {
//         text: 'Experience',
//         style: 'header'
//       },
//       this.getExperienceObject(this.admission.experiences),

//       {
//         text: 'Education',
//         style: 'header'
//       },
//       this.getEducationObject(this.admission.educations),
//       {
//         text: 'Other Details',
//         style: 'header'
//       },
//       {
//         text: this.admission.otherDetails
//       },
//       {
//         text: 'Signature',
//         style: 'sign'
//       },
//       {
//         columns : [
//             { qr: this.admission.name + ', Contact No : ' + this.admission.contactNo, fit : 100 },
//             {
//             text: `(${this.admission.name})`,
//             alignment: 'right',
//             }
//         ]
//       }
//     ],
//     info: {
//       title: this.admission.name + '_admission',
//       author: this.admission.name,
//       subject: 'admission',
//       keywords: 'admission, ONLINE admission',
//     },
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           margin: [0, 20, 0, 10],
//           decoration: 'underline'
//         },
//         name: {
//           fontSize: 16,
//           bold: true
//         },
//         jobTitle: {
//           fontSize: 14,
//           bold: true,
//           italics: true
//         },
//         sign: {
//           margin: [0, 50, 0, 10],
//           alignment: 'right',
//           italics: true
//         },
//         tableHeader: {
//           bold: true,
//         }
//       }
//   };
// }


  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.registerForm.invalid) {
  //         return;
  //     }
  //     console.log("Before submit",this.registerForm.value);
  //     this.commonService.postData(this.registerForm.value)
  //     .subscribe((result) => {
  //       console.log("rrrrrrrreeeeeesssssulllttt",result)
  //     },
  //     (error) => {
  //       console.log("errrrrrorrrrr",error);
  //     });
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeesComponent, {
      width: '80vw',height:'80vh',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
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