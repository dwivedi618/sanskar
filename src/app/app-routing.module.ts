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






const routes: Routes = [
  // {path: '',component: SidenavComponent},
  // {path: 'home',component: SidenavComponent},

  {path:'admission',component:AdmissionComponent},
  {path:'students',component:StudentsComponent},

  { path : 'login' ,component: LoginComponent},
  { path : '**' ,component: LoginComponent},


];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
   
    RouterModule.forRoot(routes),
    

  ],
  exports: [
    RouterModule,
  ],

  declarations: [

  ]
})
export class AppRoutingModule { }
