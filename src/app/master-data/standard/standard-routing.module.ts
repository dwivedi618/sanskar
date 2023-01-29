import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeStructureListComponent } from './fee-structure/fee-structure-list/fee-structure-list.component';
import { MasterStandardListComponent } from './master-standard-list/master-standard-list.component';
import { MasterSectionListComponent } from './section/master-section-list/master-section-list.component';
import { StandardLayoutComponent } from './standard-layout/standard-layout.component';

const routes: Routes = [
  {
    path: '', component: StandardLayoutComponent,data: { breadcrumb: 'Classes', icon: '' } ,
    children : [
      { path: '', component: MasterStandardListComponent},
      { path: 'fee-structure', component: FeeStructureListComponent, data: { breadcrumb: 'Fee Structure', icon: '' } },
      { path: 'section', component: MasterSectionListComponent, data: { breadcrumb: 'Section', icon: '' } },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule { }
