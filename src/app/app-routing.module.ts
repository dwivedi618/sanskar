import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { CommonModule } from '@angular/common';
// ng generate  mycomponent_name --module app-routing 
import { SidenavComponent } from './sidenav/sidenav.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';





const routes: Routes = [
  {path: 'home',component: SidenavComponent},
  {path:'students',component:StudentsComponent},
  { path : '**' ,component: LoginComponent},
  // { path : 'login' ,component: LoginComponent}


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
