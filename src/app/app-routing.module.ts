import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ng generate  mycomponent_name --module app-routing 
import { SidenavComponent } from './sidenav/sidenav.component';

import { LoginComponent } from './login/login.component';


import { DashboardComponent } from './dashboard/dashboard.component';


import { FeestructureComponent } from './feestructure/feestructure.component';
import { FeesComponent } from './fees/fees.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmissionComponent } from './admission/admission.component';

import { AdmissionModule } from './admission/admission.module';









const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children:[
      { path: 'dashboard', component: DashboardComponent },
  

      { path: 'admission',component : AdmissionComponent},

      { 
        path: 'studentcompletedetails', loadChildren: './studentcompletedetails/studentcompletedetails.module#StudentcompletedetailsModule',
        
      },
{ path : 'student' ,loadChildren : './student/student.module#StudentModule'},
      
      
      { path: 'feestructure', component: FeestructureComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'profile' , component:ProfileComponent},
    ]
  },
  

  { path: 'login', component: LoginComponent },
  { path : '**' ,component: LoginComponent},


];

@NgModule({
  imports: [
    
    AdmissionModule,
    
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
