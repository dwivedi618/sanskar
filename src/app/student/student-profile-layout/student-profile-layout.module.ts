import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileLayoutRoutingModule } from './student-profile-layout-routing.module';
import { SharedModule } from 'src/app/layouts/shared/shared.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentProfileLayoutComponent } from './student-profile-layout.component';
import { RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionComponent } from '../transaction/transaction.component';


@NgModule({
  declarations: [
    StudentProfileLayoutComponent,
    StudentProfileComponent,
    AccountsComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentProfileLayoutRoutingModule
  ],
  exports: [
    RouterModule,
    StudentProfileLayoutRoutingModule
    
  ],
})
export class StudentProfileLayoutModule { }
