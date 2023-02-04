import { NgModule } from '@angular/core';
import { AdmissionComponent } from './admission.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';

@NgModule({
  declarations: [
    AdmissionComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
  ],
  exports:[
    AdmissionComponent
  ]
})
export class AdmissionModule { }
