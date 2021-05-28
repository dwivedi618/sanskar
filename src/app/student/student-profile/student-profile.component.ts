import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { FeeDepositComponent } from '../fee-deposit/fee-deposit.component';
import { TransactionComponent } from '../transaction/transaction.component';



@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentId: any;
  isLoading: boolean;
  studentData: any;
  parentData: any;
  addressData: any;
  studentFeeDetails: any;
  displayedColumns = ['name', 'frequency','amount','action'];

  appliedFee: any;
  totalFeeDeposit: any;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private dialog : MatDialog,
    private commonService: CommonService
  ) { 
    this.activatedRoute.queryParams.subscribe((data)=>{
      console.log("activated route data",data);
      this.studentId = data.id;
      this.getProfile();
      this.getFeeDetails();
    })
  }

  ngOnInit() {
  }

  getProfile(){
    this.commonService.getStudentRecordById(this.studentId)
      .subscribe((result) => {
        console.log("Student profile", result);
        this.studentData = result.data || null;
        this.parentData = this.studentData['parents'] || null;
        this.addressData = this.studentData['address'] || null;

        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }

  getFeeDetails(){
    this.commonService.studentFeeDetails(this.studentId)
      .subscribe((result) => {
        console.log("Student profile", result);
        let studentFeeDetails = result.data || null;
        this.appliedFee = studentFeeDetails['feeStructures']
        this.totalFeeDeposit = studentFeeDetails['totalDeposited']
        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }

  getTotalCost(){
    return this.appliedFee.map(t => t.amount).reduce((acc,value)=> acc + value,0)
  }

  updateProfile(){
    this.router.navigate(['/admission'],{queryParams : {id : this.studentId , action : 'update'}})
  }

  printProfile(){
    console.log("print profile")
    this.router.navigate(['./student/print'],{queryParams : {id : this.studentId , action : 'print'}})
  }

  openfeeDeposit(){
    const data = <any>{}
    data.studentId = this.studentId
    const dialogRef = this.dialog.open(FeeDepositComponent,{
      width : '40rem',
      maxWidth : '100vw',
      maxHeight : '100vh',
      hasBackdrop : false,
      data : data
    })

    dialogRef.afterClosed().subscribe((status : Boolean )=>{
      this.getFeeDetails();
    })
  }
  
}
