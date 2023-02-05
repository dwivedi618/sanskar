import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileUpdateLayoutComponent } from '../profile-update-layout/profile-update-layout.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { AccountsComponent } from './accounts/accounts.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentProfileLayoutComponent } from './student-profile-layout.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const profileRoutes: Routes = [
  {
    path: '', component: StudentProfileLayoutComponent,
    children: [
      { path: 'overview', component: StudentProfileComponent , data:{breadcrumb : 'Overview'}},
      { path: 'accounts', component: AccountsComponent ,data:{breadcrumb : 'Accounts'}},
      { path: 'transactions', component: TransactionComponent,data:{breadcrumb : 'Transactions'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class StudentProfileLayoutRoutingModule { }
