import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';


@NgModule({
  declarations: [StudentRegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
