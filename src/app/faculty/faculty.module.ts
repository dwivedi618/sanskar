
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyLayoutComponent } from './faculty-layout/faculty-layout.component';
import { SharedModule } from '../layouts/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    FacultyListComponent,
    FacultyLayoutComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FacultyRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class FacultyModule { }
