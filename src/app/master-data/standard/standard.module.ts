import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardRoutingModule } from './standard-routing.module';
import { ManageMasterStandardComponent } from './manage-master-standard/manage-master-standard.component';
import { MasterStandardListComponent } from './master-standard-list/master-standard-list.component';
import { ManageSectionComponent } from './section/manage-section/manage-section.component';
import { MasterSectionListComponent } from './section/master-section-list/master-section-list.component';
import { StandardLayoutComponent } from './standard-layout/standard-layout.component';
import { SharedModule } from 'src/app/layouts/shared/shared.module';
import { ManageFeeStructureComponent } from './fee-structure/manage-fee-structure/manage-fee-structure.component';
import { FeeStructureListComponent } from './fee-structure/fee-structure-list/fee-structure-list.component';


@NgModule({
  declarations: [
    ManageFeeStructureComponent,
    FeeStructureListComponent,
    MasterStandardListComponent,
    MasterSectionListComponent,
    ManageMasterStandardComponent,
    ManageSectionComponent,
    StandardLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StandardRoutingModule
  ]
})
export class StandardModule { }
