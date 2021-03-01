import { ManageFeeCategoryComponent } from './manage-fee-category/manage-fee-category.component';
import { FeeStructureListComponent } from './fee-structure-list/fee-structure-list.component';
import { FeeStructureLayoutComponent } from './fee-structure-layout/fee-structure-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFeeStructureComponent } from './manage-fee-structure/manage-fee-structure.component';
import { FeeCategoryComponent } from './fee-category/fee-category.component';

const routes: Routes = [
  { path : '' ,component : FeeStructureLayoutComponent,
  children : [
    { path : '' ,component : FeeStructureListComponent },
    { path : 'master-fee-structure' ,component : FeeStructureListComponent },
    { path : 'master-fee-category' ,component : FeeCategoryComponent },
    { path : ':new' ,component : ManageFeeStructureComponent },
    { path : ':edit' ,component : ManageFeeStructureComponent },
    { path : 'master-fee-category/:new',component : ManageFeeCategoryComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeStructureRoutingModule { }
