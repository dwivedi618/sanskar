import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentcompletedetailsComponent } from '../studentcompletedetails/studentcompletedetails.component'


const studentroutes: Routes = [
    { path:'', component : StudentcompletedetailsComponent}
]
@NgModule({
    imports: [
      RouterModule,
      RouterModule.forChild(studentroutes),
    ],
    exports: [
      RouterModule,
    ],
    declarations: [
  
    ]
  })

  export class StudentcompletedetailsRoutingModule { }