import { MasterStandardList, MasterStandardListComponent } from './standard/master-standard-list/master-standard-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFeeCategoryComponent } from './fee-category/manage-fee-category/manage-fee-category.component';
import { MasterFeeCategoryListComponent } from './fee-category/master-fee-category-list/master-fee-category-list.component';
import { FeeStructureListComponent } from './fee-structure/fee-structure-list/fee-structure-list.component';
import { ManageFeeStructureComponent } from './fee-structure/manage-fee-structure/manage-fee-structure.component';
import { MasterDataLayoutComponent } from './master-data-layout/master-data-layout.component';
import { ConfigurationHomeComponent } from './configuration-home/configuration-home.component';
import { MasterSectionListComponent } from './standard/section/master-section-list/master-section-list.component';

const routes: Routes = [
  {
    path: '', component: MasterDataLayoutComponent,
    children: [
      { path: '', component: ConfigurationHomeComponent, },
      { path: 'fee-structure', component: FeeStructureListComponent },
      { path: 'section', component: MasterSectionListComponent },
      { path: 'master-standard', component: MasterStandardListComponent },
      { path: 'master-fee-category', component: MasterFeeCategoryListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
