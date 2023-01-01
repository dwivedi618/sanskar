import { SharedModule } from './../layouts/shared/shared.module';
import { FeeStructureListComponent } from './fee-structure/fee-structure-list/fee-structure-list.component';
import { MasterFeeCategoryListComponent } from './fee-category/master-fee-category-list/master-fee-category-list.component';
import { MasterDataLayoutComponent } from './master-data-layout/master-data-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { ManageFeeCategoryComponent } from './fee-category/manage-fee-category/manage-fee-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ManageFeeStructureComponent } from './fee-structure/manage-fee-structure/manage-fee-structure.component';
import { MasterStandardListComponent } from './standard/master-standard-list/master-standard-list.component';
import { ManageMasterStandardComponent } from './standard/manage-master-standard/manage-master-standard.component';
import { ConfigurationHomeComponent } from './configuration-home/configuration-home.component';


@NgModule({
  declarations: [
    MasterDataLayoutComponent,
    MasterFeeCategoryListComponent,
    ManageFeeCategoryComponent,
    FeeStructureListComponent,
    ManageFeeStructureComponent,
    MasterStandardListComponent,
    MasterStandardListComponent,
    ManageMasterStandardComponent,
    ConfigurationHomeComponent,
    

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
    FeeStructureListComponent,
    ManageFeeStructureComponent,
    MasterStandardListComponent,
    MasterStandardListComponent,
    ManageMasterStandardComponent,
    ConfigurationHomeComponent
  ]
})
export class MasterDataModule { }
