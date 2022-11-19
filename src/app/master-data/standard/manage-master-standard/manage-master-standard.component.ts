import { AlertService } from '../../../services/alert.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
  

@Component({
  selector: 'app-manage-master-standard',
  templateUrl: './manage-master-standard.component.html',
  styleUrls: ['./manage-master-standard.component.css']
})
export class ManageMasterStandardComponent implements OnInit {

  masterStandardForm : FormGroup
  isSaving: boolean;
  constructor(
    private fb : FormBuilder,
    private commonService : CommonService,
    private alertService : AlertService
  ) { 
    this.masterStandardForm = this.fb.group({
      name : [,Validators.required],
      description : []
    })
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
  }

  
  submit(){
    if(this.masterStandardForm.invalid){
      this.alertService.alert('Can not insert empty data','close');
      return
    }
    this.isSaving =true;
    this.commonService.masterstandard(this.masterStandardForm.value).subscribe((result)=>{
      // console.log("master result",result);
      this.isSaving =false;
      this.alertService.alertComponent(result.message || 'Submitted');
      this.masterStandardForm.reset();
    },(error)=>{
      this.isSaving =false;
      console.log("master student Form error",error);
    })
  }


}
