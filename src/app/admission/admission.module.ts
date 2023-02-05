import { NgModule } from '@angular/core';
import { AdmissionComponent } from './admission.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdmissionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    
    ReactiveFormsModule,
  ],
  exports:[
    AdmissionComponent
  ]
})
export class AdmissionModule { }
