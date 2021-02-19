
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyLayoutComponent } from './faculty-layout/faculty-layout.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';

const routes: Routes = [
  { path : '',component : FacultyLayoutComponent,
  children : [
    { path : 'all', component: FacultyListComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
