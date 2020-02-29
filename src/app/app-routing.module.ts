import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { CommonModule } from '@angular/common';
// ng generate  mycomponent_name --module app-routing 
import { SidenavComponent } from './sidenav/sidenav.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { AdmissionComponent } from './admission/admission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentcompletedetailsComponent } from './studentcompletedetails/studentcompletedetails.component'
import { FeestructureComponent } from './feestructure/feestructure.component';
import { FeesComponent } from './fees/fees.component';







const routes: Routes = [
  {path: 'studentcompletedetails',component: StudentcompletedetailsComponent},
  {path: 'dashboard',component: DashboardComponent},

  {path:'admission',component:AdmissionComponent},
  {path:'students',component:StudentsComponent},
  { path: 'feestructure',component:FeestructureComponent},
  { path: 'fees',component:FeesComponent},


  // { path : 'login' ,component: LoginComponent},
  // { path : '**' ,component: LoginComponent},


];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
   
    RouterModule.forRoot(routes),
    

  ],
  exports: [
    RouterModule,
  ],

  declarations: [

  ]
})
export class AppRoutingModule { }
