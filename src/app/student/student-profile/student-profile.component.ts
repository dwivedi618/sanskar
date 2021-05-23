import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';



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

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private commonService: CommonService
  ) { 
    this.activatedRoute.queryParams.subscribe((data)=>{
      console.log("activated route data",data);
      this.studentId = data.id;
      this.getProfile();
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

  updateProfile(){
    this.router.navigate(['/admission'],{queryParams : {id : this.studentId , action : 'update'}})
  }

  printProfile(){
    console.log("print profile")
  }
  
}
