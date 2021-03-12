
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
  constructor(
    private fb : FormBuilder,
    private commonService : CommonService
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
    this.commonService.masterstandard(this.masterStandardForm.value).subscribe((result)=>{
      console.log("master student Form result",result);
    },(error)=>{
      console.log("master student Form error",error);
    })
  }

  dateInputChangeStart(event){
    console.log('Start',event.value);
    if(this.range.value.start){
      // this.range.patchValue({'end': new Date(24/10/2021)})
    }

  }
  dateInputChangeEnd(event){
    console.log('End',event.value);
    if(this.range.value.start){
      // this.range.patchValue({'end': new Date(24/10/2021)})
    }

  }
  onClose(){
    console.log("date Picker close");
    const today = new Date();
    if(!this.range.value.end){
      this.range.patchValue({'end': today})
    }
  }
}
