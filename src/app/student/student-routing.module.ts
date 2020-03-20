import { NgModule } from '@angular/core';
import { Routes,RouterModule } from "@angular/router";
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component'

const studentroutes: Routes = [
    { path:'', component : StudentsListComponent},
    { path:'student-profile', component : StudentProfileComponent},

] 
@NgModule({
imports: [    
    RouterModule,
    RouterModule.forChild(studentroutes),
],
exports: [
    RouterModule,
    
  ],
})

export class StudentRoutingModule{}