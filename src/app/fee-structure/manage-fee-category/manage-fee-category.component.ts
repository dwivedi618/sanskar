import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-fee-category',
  templateUrl: './manage-fee-category.component.html',
  styleUrls: ['./manage-fee-category.component.css']
})
export class ManageFeeCategoryComponent implements OnInit {

  masterFeeCategoryForm : FormGroup
  constructor(
    private fb : FormBuilder,
    private commonService : CommonService
  ) { 
    this.masterFeeCategoryForm = this.fb.group({
      name : [,Validators.required],
      description : []
    })
  }


  ngOnInit(): void {
  }

  
  submit(){
    this.commonService.masterFee(this.masterFeeCategoryForm.value).subscribe((result)=>{
      console.log("masterFeeCategoryForm",result);
    },(error)=>{
      console.log("masterFeeCategoryForm",error);
    })
  }



}
