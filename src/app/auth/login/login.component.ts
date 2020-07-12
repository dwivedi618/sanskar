import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  user :any;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
    ) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        // firstName: ['', Validators.required],
        // lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
    }
     // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      
      
      this.router.navigate(['']);
      console.log("EERRRRRROOOORRRRR")
      this.router.navigate[''];
      console.log("derrror")

      // stop here if form is invalid
      // if (this.loginForm.invalid) {
      //     return;
      // }
      // this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
      // .subscribe(result => {
      //   console.log("sidena on login",result)
      //   this.router.navigate['/sidenav'];
      // }, error => {
      //   console.log("EERRRRRROOOORRRRR",error)
      // })

  
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }

  getErrorMessage() {
    if (this.f.email.hasError('required')) {
      return 'Email Required';
    }

    return this.f.email.hasError('email') ? 'Not a valid email' : '';
  }
}
