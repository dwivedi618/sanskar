import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { AccountsComponent } from './accounts/accounts.component';
import { StudentProfileLayoutComponent } from './student-profile-layout.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const profileRoutes: Routes = [
  {
    path: '', component: StudentProfileLayoutComponent,
    children: [
      { path: '', component: StudentProfileComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'transactions', component: TransactionComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class StudentProfileLayoutRoutingModule { }
