import { Component, OnInit } from '@angular/core';
import { Admission, Experience, Education, Skill } from './admission';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  admission = new Admission();
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          middleName: [''],
          lastName: [''],
          gender: ['Male'],
          dateOfBirth: [new Date()],
          fatherName: ['', Validators.required],
          motherName: ['', Validators.required],
          fatherEducation : [''],
          fatherOccupation : [''],
          motherEducation : [''],
          motherOccupation :[''],
          permanentAddress: this.formBuilder.group({
            village: ['',Validators.required],
            district: ['',Validators.required],
            state: ['',Validators.required],
            post: ['',Validators.required]
          }),
          localAddress: this.formBuilder.group({
            village: [''],
            district: [''],
            state: [''],
            post: ['']
          }),
          guardianName : ['', Validators.required],
          contactNumber :['', Validators.required,Validators.maxLength(10)],
          nationality : ['Indian'],
          healthStatus : [''],
          bloodGroup : [''],
          standard : ['',Validators.required],//admission In
          convenience : ['Yes'],
          place : ['']
           


          // email: ['', [Validators.required, Validators.email]],
          // password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get ff(){ return this.registerForm.get(['permanentAddress'])['controls']; }//for accessing nested form permanentAddress
  get fff(){ return this.registerForm.get(['localAddress'])['controls']; }//for accessing nested form localAddress

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
