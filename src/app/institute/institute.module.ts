import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteRoutingModule } from './institute-routing.module';
import { InstituteLayoutComponent } from './institute-layout/institute-layout.component';
import { SharedModule } from '../layouts/shared/shared.module';
import { BranchesComponent } from './branches/branches.component';
import { InstituteInformationComponent } from './institute-information/institute-information.component';
import { ManageInstituteInformationComponent } from './manage-institute-information/manage-institute-information.component';


@NgModule({
  declarations: [
    InstituteLayoutComponent,
    BranchesComponent,
    InstituteInformationComponent,
    ManageInstituteInformationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InstituteRoutingModule
  ]
})
export class InstituteModule { }
