import { AlertService } from './../../../services/alert.service';
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
  isSaving: boolean;
  constructor(
    private fb : FormBuilder,
    private commonService : CommonService,
    private alertService : AlertService
  ) { 
    this.masterFeeCategoryForm = this.fb.group({
      name : [,Validators.required],
      description : []
    })
  }


  ngOnInit(): void {
  }

  
  submit(){
    if(this.masterFeeCategoryForm.invalid){
      this.alertService.alert('Can not insert empty data','close');
      return
    }
    this.isSaving = true;
    this.commonService.addMasterFeeCategory(this.masterFeeCategoryForm.value).subscribe((result)=>{
      console.log("masterFeeCategoryForm",result);
      this.isSaving = true;

    },(error)=>{
      console.log("masterFeeCategoryForm",error);
      this.isSaving = true;

    })
  }



}
