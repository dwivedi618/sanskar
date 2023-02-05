import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileLayoutRoutingModule } from './student-profile-layout-routing.module';
import { SharedModule } from 'src/app/layouts/shared/shared.module';
import { StudentOverviewComponent } from './overview/student-overview.component';
import { StudentProfileLayoutComponent } from './student-profile-layout.component';
import { RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionComponent } from './transaction/transaction.component';
import { StudentFormComponent } from '../forms/student-form/student-form.component';
import { ParentFormComponent } from '../forms/parent-form/parent-form.component';
import { AddressFormComponent } from '../forms/address-form/address-form.component';
import { PermanentAddressFormComponent } from '../forms/permanent-address-form/permanent-address-form.component';
import { LocalAddressFormComponent } from '../forms/local-address-form/local-address-form.component';


@NgModule({
  declarations: [
    StudentProfileLayoutComponent,
    StudentOverviewComponent,
    AccountsComponent,
    TransactionComponent,
    StudentFormComponent,
    ParentFormComponent,
    AddressFormComponent,
    PermanentAddressFormComponent,
    LocalAddressFormComponent
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
