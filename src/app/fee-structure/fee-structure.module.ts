import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeeStructureRoutingModule } from './fee-structure-routing.module';
import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { FeeStructureLayoutComponent } from './fee-structure-layout/fee-structure-layout.component';
import { ManageFeeStructureComponent } from './manage-fee-structure/manage-fee-structure.component';
import { ManageFeeCategoryComponent } from './manage-fee-category/manage-fee-category.component';
import { FeeCategoryComponent } from './fee-category/fee-category.component';


@NgModule({
  declarations: [FeeStructureListComponent, FeeStructureLayoutComponent, ManageFeeStructureComponent, ManageFeeCategoryComponent, FeeCategoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FeeStructureRoutingModule
  ]
})
export class FeeStructureModule { }
