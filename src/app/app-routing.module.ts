import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { AdmissionComponent } from './admission/admission.component';
import { LayoutComponent } from './layouts/layout/layout.component';


// import { AdmissionModule } from './admission/admission.module';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path : '' , loadChildren : './dashboard/dashboard.module#DashboardModule',data: { breadcrumb: 'Dashboard', icon: 'grid_view' } },
      { path : 'dashboard' , loadChildren : './dashboard/dashboard.module#DashboardModule',data: { breadcrumb: 'Dashboard', icon: 'grid_view' } },
      { path: 'admission', component: AdmissionComponent ,data: { breadcrumb: 'Admission', icon: 'grid_view' }},
      { path: 'student', loadChildren: './student/student.module#StudentModule',data: { breadcrumb: 'Student', icon: 'people' }},
      { path: 'registration', loadChildren: './registration/registration.module#RegistrationModule',data: { breadcrumb: 'Registration', icon: '' }},
      { path : 'configuration' , loadChildren : './master-data/master-data.module#MasterDataModule',data: { breadcrumb: 'My School', icon: 'settings' } },
      { path: 'settings', component: SettingsComponent ,data: { breadcrumb: 'Settings', icon: 'settings' } },
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
