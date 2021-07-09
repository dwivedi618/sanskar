import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmissionComponent } from './admission/admission.component';
import { LayoutComponent } from './layouts/layout/layout.component';


// import { AdmissionModule } from './admission/admission.module';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
     
      { path : '' , loadChildren : './dashboard/dashboard.module#DashboardModule'},
      { path : 'dashboard' , loadChildren : './dashboard/dashboard.module#DashboardModule'},
      { path: 'admission', component: AdmissionComponent },
     
      { path: 'student', loadChildren: './student/student.module#StudentModule' },
     
      { path : 'configuration' , loadChildren : './master-data/master-data.module#MasterDataModule'},

      { path: 'settings', component: SettingsComponent },
      { path: 'profile', component: ProfileComponent },
 
    ]
  },


  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**',  loadChildren: './auth/auth.module#AuthModule'},


];
@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }
