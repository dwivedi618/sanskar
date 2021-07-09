import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '',component : DashboardLayoutComponent ,
  children : [
    { path : '',component : DashboardHomeComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
