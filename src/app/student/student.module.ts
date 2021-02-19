import { NgModule } from '@angular/core';

import { StudentComponent } from './student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

import { StudentRoutingModule } from './student-routing.module';

import { TransactionComponent } from './transaction/transaction.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';




@NgModule({
  declarations: [
    StudentComponent,
    StudentsListComponent,
    StudentProfileComponent,

     TransactionComponent
    ],
  imports: [
    SharedModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  exports : [
    
    StudentRoutingModule
  ],
  entryComponents: [
    TransactionComponent,StudentProfileComponent
  ],
  
})
export class StudentModule { }
