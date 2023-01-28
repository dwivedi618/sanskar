import { MasterStandardList, MasterStandardListComponent } from './standard/master-standard-list/master-standard-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFeeCategoryComponent } from './fee-category/manage-fee-category/manage-fee-category.component';
import { MasterFeeCategoryListComponent } from './fee-category/master-fee-category-list/master-fee-category-list.component';
import { MasterDataLayoutComponent } from './master-data-layout/master-data-layout.component';
import { ConfigurationHomeComponent } from './configuration-home/configuration-home.component';
import { MasterSectionListComponent } from './standard/section/master-section-list/master-section-list.component';
import { AcademicYearListComponent } from './academic-year/academic-year-list/academic-year-list.component';
import { StandardModule } from './standard/standard.module';

const routes: Routes = [
  {
    path: '', component: MasterDataLayoutComponent,
    children: [
      { path: '', component: ConfigurationHomeComponent, },
      {
        path: 'classes', 
        loadChildren: () => import('./standard/standard.module')
        .then(m => m.StandardModule)
      },
      { path: 'master-fee-category', component: MasterFeeCategoryListComponent, data: { breadcrumb: 'Fee', icon: '' } },
      { path: 'academic-year', component: AcademicYearListComponent, data: { breadcrumb: 'Academic Year', icon: 'calender' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
