import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  
  paymentForm : FormGroup;
  submitted = false;
  totalFees = 455;
  submittedFees = 0;
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

}
