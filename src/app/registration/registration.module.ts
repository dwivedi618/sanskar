import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { QuickRegistrationComponent } from './quick-registration/quick-registration.component';
import { SharedModule } from '../layouts/shared/shared.module';
import { AdmissionComponent } from '../admission/admission.component';
import { AdmissionModule } from '../admission/admission.module';
import { RegistrationLayoutComponent } from './registration-layout/registration-layout.component';


@NgModule({
  declarations: [StudentRegistrationComponent, RegistrationLayoutComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    AdmissionModule
  ],
  exports : [  ]
})
export class RegistrationModule { }
