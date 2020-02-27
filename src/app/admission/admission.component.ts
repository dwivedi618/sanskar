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
          lastName: ['', Validators.required],
          gender: ['Male'],
          dateOfBirth: [new Date()],
          fatherName: ['', Validators.required],
          motherName: ['', Validators.required],
          fatherEducation : [''],
          fatherOccupation : [''],
          motherEducation : [''],
          motherOccupation :[''],
          permanentAddress: this.formBuilder.group({
            village: [''],
            district: [''],
            state: [''],
            post: ['']
          }),
          localAddress: this.formBuilder.group({
            village: [''],
            district: [''],
            state: [''],
            post: ['']
          }),
          guardianName : [''],
          contactNumber :[''],
          nationality : ['Indian'],
          healthStatus : [''],
          bloodGroup : [''],
          admissionIn : [''],
          convenience : ['Yes'],
          place : ['']
           


          // email: ['', [Validators.required, Validators.email]],
          // password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
