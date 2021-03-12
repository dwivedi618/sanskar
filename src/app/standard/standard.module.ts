import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandardRoutingModule } from './standard-routing.module';
import { StandardLayoutComponent } from './standard-layout/standard-layout.component';
import { MasterStandardComponent } from './master-standard/master-standard.component';
import { ManageMasterStandardComponent } from './manage-master-standard/manage-master-standard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [StandardLayoutComponent, MasterStandardComponent, ManageMasterStandardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StandardRoutingModule
  ]
})
export class StandardModule { }
