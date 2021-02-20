
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { FacultyLayoutComponent } from './faculty-layout/faculty-layout.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';

const routes: Routes = [
  { path : '',component : FacultyLayoutComponent,
  children : [
    { path : 'all', component: FacultyListComponent},
    { path : '', component: FacultyListComponent},
    { path : 'add-faculty', component: AddFacultyComponent}


  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
