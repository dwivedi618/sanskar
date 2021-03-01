import { MasterStandardComponent } from './master-standard/master-standard.component';
import { StandardLayoutComponent } from './standard-layout/standard-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageMasterStandardComponent } from './manage-master-standard/manage-master-standard.component';

const routes: Routes = [
  { path : '',component : StandardLayoutComponent,
  children : [
    { path : '' ,component : MasterStandardComponent},
    { path : 'manage-master-standard' ,component : ManageMasterStandardComponent},

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule { }
