import { NgModule } from '@angular/core';
import { AdmissionComponent } from './admission.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';
import { StudentFormComponent } from './student-form/student-form.component';

@NgModule({
  declarations: [
    AdmissionComponent,
    StudentFormComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AdmissionModule { }
