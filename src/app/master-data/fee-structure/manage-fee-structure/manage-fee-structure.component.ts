import { AlertService } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-fee-structure',
  templateUrl: './manage-fee-structure.component.html',
  styleUrls: ['./manage-fee-structure.component.css']
})
export class ManageFeeStructureComponent implements OnInit {
  standardLists: any;
  feeCategoryList: any;
  feeStructureForm: FormGroup

  feeFrequency = [
    { value: "MONTHLY", viewValue: 1 },
    { value: "BIMESTERLY", viewValue: 2 },
    { value: "QUARTERLY", viewValue: 3 },
    { value: "QUADRIMESTERLY", viewValue: 4 },
    { value: "HALF-YEARLY", viewValue: 6 },
    { value: "YEARLY", viewValue: 12 },
  ]
  isSaving: boolean;
  standardName : string

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertService : AlertService,
    private commonService: CommonService
  ) {
    this.feeStructureForm = this.fb.group({
      year: [],
      standardId: [],
      feeStructure: new FormArray([]),
    })
  }

  ngOnInit(): void {
    this.getStandardList();
    this.getFeeCategoryList();
  }

  get f1() { return this.feeStructureForm.controls }
  get feeStructure() { return this.feeStructureForm.get('feeStructure') as FormArray }


  /**
   * submit new faculty router back to faculty list
   */
  submit() {
  
    this.isSaving = true;
    this.router.navigate(['./master'], { queryParams: { 
      year: this.feeStructureForm.value.year,
      standardId:  this.feeStructureForm.value.standardId  ,
      n : this.standardName }})
    this.commonService.addMasterFeeStructure(this.feeStructureForm.value).subscribe(result=>{
    console.log("result",result);
    this.isSaving = false;
    this.router.navigate(['./'], { queryParams: { 
      year: this.feeStructureForm.value.year,
      standardId:  this.feeStructureForm.value.standardId  ,
      n : this.standardName }, queryParamsHandling: 'merge' })

    this.alertService.alertComponent(result.message || '')

    },error =>{
      console.log("error",error);
    this.isSaving = false;


    })
    // this.router.navigate(['/faculty']);
  }

  /**
 * @use dropdown list of all standard (classes)
 */
  getStandardList() {
    console.log("get Standard List")
    this.commonService.getMasterStandard().subscribe((result) => {
      console.log("result", result);
      this.standardLists = result.data || null;
    }, (error) => {
      console.log("error", error);
    })
  }

  getFeeCategoryList() {
    this.commonService.getMasterFee().subscribe((result) => {
      console.log("getMasterFeeCategory result", result);
      this.feeCategoryList = result['data'] || [];
      if (this.feeCategoryList.length != 0) {
        this.createDynamicForm();
      }
    }, (error) => {
      console.log("getMasterFeeCategory error", error);
    })
  }

  createDynamicForm() {
    const control = <FormArray>this.feeStructureForm.get('feeStructure')
    for (let i = 0; i < this.feeCategoryList.length; i++) {
      this.feeStructure.push(this.addfeeCategory(this.feeCategoryList[i]));
    }
  }

  addfeeCategory(feeCategory) {
    return this.fb.group({
      feeId: [feeCategory.id],
      frequency: [],
      amount: [],
      required: [],
      isactive: []
    })
  }

  onCHeckBoxChange(event){
    console.log("matcheckbox event",event.checked)
  }

}
