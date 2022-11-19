import { AlertService } from './../../services/alert.service';
import { Student } from './../students-list/students-list.component';

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-fee-deposit',
  templateUrl: './fee-deposit.component.html',
  styleUrls: ['./fee-deposit.component.css']
})
export class FeeDepositComponent implements OnInit {

  feeDepositForm : FormGroup
  studentId: any;
  isSubmitting: boolean;
  constructor(
    private fb : FormBuilder,
    private commonService : CommonService,
    private alertService : AlertService,
    private dialogRef : MatDialogRef<FeeDepositComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.feeDepositForm = this.fb.group({
      amount : [,Validators.required],
      remark : [],
      studentId : []
    })
    if(data && data.studentId){
      this.studentId = data.studentId;
      this.feeDepositForm.patchValue({ 'studentId': this.studentId})
    }
  }


  ngOnInit(): void {
  }

  
  submit(){
    this.isSubmitting = true;
    this.commonService.studentFeeDeposit(this.studentId,this.feeDepositForm.value).subscribe((result)=>{
      console.log("feeDepositForm",result);
    this.isSubmitting = false;
    this.alertService.alertComponent(result['message']);
    this.dialogRef.close(true);

    },(error)=>{
      console.log("feeDepositForm",error);
    this.isSubmitting = false;

    })
  }



}
