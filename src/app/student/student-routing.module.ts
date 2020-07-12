import { NgModule } from '@angular/core';
import { Routes,RouterModule } from "@angular/router";
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component'
import { StudentComponent } from './student.component';

const studentroutes: Routes = [
    { 
        path:'', component : StudentComponent,
        children:[
        { path:'', component : StudentsListComponent},
         { path:'student-profile', component : StudentProfileComponent},]
    }


];
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