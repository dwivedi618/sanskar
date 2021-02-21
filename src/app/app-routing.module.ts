import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeestructureComponent } from './feestructure/feestructure.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmissionComponent } from './admission/admission.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ClassRegisterComponent } from './class-register/class-register.component';


// import { AdmissionModule } from './admission/admission.module';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'admission', component: AdmissionComponent },
      { path: 'faculty', loadChildren : './faculty/faculty.module#FacultyModule' },
      { path: 'student', loadChildren: './student/student.module#StudentModule' },
      { path: 'feestructure', component: FeestructureComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'class-registration', component: ClassRegisterComponent },

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
