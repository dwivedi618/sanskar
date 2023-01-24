import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { InstituteInformationComponent } from './institute-information/institute-information.component';
import { InstituteLayoutComponent } from './institute-layout/institute-layout.component';

const routes: Routes = [
  {
    path: "", component: InstituteLayoutComponent, children: [
      { path: "", component: InstituteInformationComponent },
      { path: "branches", component: BranchesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
