import { SharedModule } from './../layouts/shared/shared.module';
import { MasterFeeCategoryListComponent } from './fee-category/master-fee-category-list/master-fee-category-list.component';
import { MasterDataLayoutComponent } from './master-data-layout/master-data-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { ManageFeeCategoryComponent } from './fee-category/manage-fee-category/manage-fee-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MasterStandardListComponent } from './standard/master-standard-list/master-standard-list.component';
import { ManageMasterStandardComponent } from './standard/manage-master-standard/manage-master-standard.component';
import { ConfigurationHomeComponent } from './configuration-home/configuration-home.component';
import { ManageSectionComponent } from './standard/section/manage-section/manage-section.component';
import { MasterSectionListComponent } from './standard/section/master-section-list/master-section-list.component';
import { AcademicYearListComponent } from './academic-year/academic-year-list/academic-year-list.component';
import { ManageAcademicYearComponent } from './academic-year/manage-academic-year/manage-academic-year.component';


@NgModule({
  declarations: [
    MasterDataLayoutComponent,
    MasterFeeCategoryListComponent,
    ManageFeeCategoryComponent,
    ConfigurationHomeComponent,
    AcademicYearListComponent,
    ManageAcademicYearComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MasterDataRoutingModule
  ], 
  exports: [
    MasterDataLayoutComponent,
    MasterFeeCategoryListComponent,
    ManageFeeCategoryComponent,
    MasterStandardListComponent,
    MasterStandardListComponent,
    ManageMasterStandardComponent,
    ConfigurationHomeComponent,
    ManageSectionComponent,
    ManageAcademicYearComponent
  ]
})
export class MasterDataModule { }
