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
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard', icon: 'grid_view' } },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard', icon: 'grid_view' } },
      { path: 'admission', component: AdmissionComponent, data: { breadcrumb: 'Admission', icon: 'grid_view' } },
      { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), data: { breadcrumb: 'Student', icon: 'people' }},
      { path: 'institute', loadChildren: () => import('./institute/institute.module').then(m => m.InstituteModule), data: { breadcrumb: 'Institute', icon: 'apartment' } },

      { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule), data: { breadcrumb: 'Registration', icon: '' } },
      { path: 'configuration', loadChildren: () => import('./master-data/master-data.module').then(m => m.MasterDataModule), data: { breadcrumb: 'My School', icon: 'settings' } },
      { path: 'settings', component: SettingsComponent, data: { breadcrumb: 'Settings', icon: 'settings' } },
    ]
  },


  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },


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
