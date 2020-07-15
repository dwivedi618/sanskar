import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ng generate  mycomponent_name --module app-routing 
import { SidenavComponent } from './sidenav/sidenav.component';




import { DashboardComponent } from './dashboard/dashboard.component';


import { FeestructureComponent } from './feestructure/feestructure.component';

import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmissionComponent } from './admission/admission.component';

// import { AdmissionModule } from './admission/admission.module';









const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },


      { path: 'admission', component: AdmissionComponent },

      { path: 'student', loadChildren: './student/student.module#StudentModule' },


      { path: 'feestructure', component: FeestructureComponent },
      
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
