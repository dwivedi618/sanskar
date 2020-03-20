import { NgModule } from '@angular/core';

import { StudentcompletedetailsRoutingModule } from './studentcompletedetails-routing.module'
import { SharedModule } from '../shared/shared.module';
import { StudentcompletedetailsComponent } from './studentcompletedetails.component';
import { AboutComponent } from './about/about.component';
import { ParentsComponent } from './parents/parents.component';



@NgModule({
  declarations: [
    StudentcompletedetailsComponent,
    AboutComponent,
    ParentsComponent,
  ],
  imports: [
    
    SharedModule,
    StudentcompletedetailsRoutingModule,
  ],
  exports : [
    
    StudentcompletedetailsRoutingModule
  ]
})
export class StudentcompletedetailsModule { }
