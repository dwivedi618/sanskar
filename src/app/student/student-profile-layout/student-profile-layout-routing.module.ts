import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountsComponent } from './accounts/accounts.component';
import { StudentProfileLayoutComponent } from './student-profile-layout.component';
import { StudentOverviewComponent } from './overview/student-overview.component';

const profileRoutes: Routes = [
  {
    path: '', component: StudentProfileLayoutComponent,
    children: [
      { path: 'overview', component: StudentOverviewComponent , data:{breadcrumb : 'Overview'}},
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
