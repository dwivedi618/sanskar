import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FeeInstallment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  
  paymentForm : FormGroup;
  submitted = false;
  totalFees = 455;
  tutionFee = 777;
  convenienceFee = 345;
  submittedFees = 0;
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

  fees: FeeInstallment[] = [
    {value: 'perOneMonth', viewValue: '1 Month'},
    {value: 'perThreeMonth', viewValue: '3 Month'},
    {value: 'perSixMonth', viewValue: '6 Month'},
    {value: 'perYear', viewValue: 'Complete Year'}
  ];

}
