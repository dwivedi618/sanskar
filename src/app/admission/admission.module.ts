import { NgModule } from '@angular/core';
import { AdmissionComponent } from './admission.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    AdmissionComponent,
    
  ],
  imports: [
    
    SharedModule,
    ReactiveFormsModule,

    
  ],
  // entryComponents: [AdmissionComponent ,FeesComponent],
})
export class AdmissionModule { }
