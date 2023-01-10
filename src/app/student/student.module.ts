import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { StudentsListComponent } from './students-list/students-list.component';

import { StudentRoutingModule } from './student-routing.module';

import { TransactionComponent } from './transaction/transaction.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { AdmissionFormPrintLayoutComponent } from './admission-form-print-layout/admission-form-print-layout.component';
import { FeeDepositComponent } from './fee-deposit/fee-deposit.component';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    StudentsListComponent,
    
    StudentLayoutComponent,
    AdmissionFormPrintLayoutComponent,
    FeeDepositComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule,
  ],
  exports : [
    StudentRoutingModule
  ],
  entryComponents: [
    TransactionComponent,FeeDepositComponent
  ],
  
})
export class StudentModule { }
