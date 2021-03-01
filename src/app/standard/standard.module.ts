import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandardRoutingModule } from './standard-routing.module';
import { StandardLayoutComponent } from './standard-layout/standard-layout.component';
import { MasterStandardComponent } from './master-standard/master-standard.component';
import { ManageMasterStandardComponent } from './manage-master-standard/manage-master-standard.component';


@NgModule({
  declarations: [StandardLayoutComponent, MasterStandardComponent, ManageMasterStandardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StandardRoutingModule
  ]
})
export class StandardModule { }
