import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ConvenienceFee {
  convenienceFee: Number;
  convenienceFeeName: string;
}

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  paymentForm : FormGroup;
  checked=false;
  submitted = false;
  tutionFee = 654;
  totalFees = this.tutionFee;
  convenienceFee = 345;
  submittedFees = 0;
  previousSubmittedFees=567;
  studentName= "Vaibhav Pandey";
  fatherName ="Ajay Pandey"
  standard="10"
  currentDues = (this.totalFees) - (this.submittedFees);
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      studentName : ['',Validators.required],
      standard : ['',Validators.required],
      fatherName : ['',Validators.required],
      // feeType : ['',Validators.required],
      submittedFees: ['',Validators.required]


    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.paymentForm.controls; }

  onSubmit() {
      this.submitted = true;
      
      // stop here if form is invalid
      if (this.paymentForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.paymentForm.value))
  }
  onChange($event){
    this.totalFees = this.tutionFee
    if(this.checked){
    this.totalFees =  this.totalFees + this.convenienceFee;
    console.log("total fee on checked",this.totalFees);}
    else{
      this.totalFees =  this.totalFees - this.convenienceFee;
      console.log("total fee on unchecked",this.totalFees);
    }
  }
  fees : ConvenienceFee[] = [
    { convenienceFee: 233, convenienceFeeName:'fee1' },
    { convenienceFee: 333, convenienceFeeName:'fee2' },
    
    ];


}
