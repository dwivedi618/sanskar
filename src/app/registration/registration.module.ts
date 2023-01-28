import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { QuickRegistrationComponent } from './quick-registration/quick-registration.component';
import { SharedModule } from '../layouts/shared/shared.module';


@NgModule({
  declarations: [StudentRegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule
  ],
  exports : [  ]
})
export class RegistrationModule { }
