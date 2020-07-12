import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';




@NgModule({
  declarations: [StudentComponent,StudentsListComponent, StudentProfileComponent,],
  imports: [
    SharedModule,
    StudentRoutingModule
  ],
  exports : [
    
    StudentRoutingModule
  ]
})
export class StudentModule { }
