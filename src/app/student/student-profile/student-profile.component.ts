import { Component, OnInit,Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { inject } from '@angular/core/testing';
import { TransactionComponent } from '../transaction/transaction.component';
import { AdmissionComponent } from 'src/app/admission/admission.component';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  local_data:any;
  action : any;
  constructor(
    private dialog: MatDialog,
    private dialogRef : MatDialogRef<StudentProfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data :any
  ) {
    this.local_data = data.obj;
    this.action = data.obj.action;
    console.log("local data : ",this.local_data);
   }

  ngOnInit() {
  }
  onUpdateStudentProfile(obj){
    obj = this.local_data
    obj.action = 'update';
       const dialogRef = this.dialog.open(AdmissionComponent,{
         width:'70vw',
         maxWidth: '100%',
        //  height:'100vh',
         data : {obj}
       })
       this.closeProfile();
  }
  openFeeSubmition(obj){
    obj.action = 'submitFee';
       const dialogRef = this.dialog.open(TransactionComponent,{
         width:'30rem',
         maxWidth: '100vw',
         data : {obj}
       })
    
    }
  closeProfile(){
    this.dialogRef.close();
  }
}
