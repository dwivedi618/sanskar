import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

import { StudentRoutingModule } from './student-routing.module';

import { TransactionComponent } from './transaction/transaction.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { AdmissionFormPrintLayoutComponent } from './admission-form-print-layout/admission-form-print-layout.component';




@NgModule({
  declarations: [
    StudentsListComponent,
    StudentProfileComponent,
    TransactionComponent,
    StudentLayoutComponent,
    AdmissionFormPrintLayoutComponent
    ],
  imports: [
    SharedModule,
    MaterialModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    
  ],
  exports : [
    
    StudentRoutingModule
  ],
  entryComponents: [
    TransactionComponent,StudentProfileComponent
  ],
  
})
export class StudentModule { }
