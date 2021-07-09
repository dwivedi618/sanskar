import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../layouts/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DashboardHomeComponent, DashboardLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
