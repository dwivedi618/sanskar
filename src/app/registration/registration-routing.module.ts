import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmissionComponent } from '../admission/admission.component';
import { StandardLayoutComponent } from '../master-data/standard/standard-layout/standard-layout.component';
import { RegistrationLayoutComponent } from './registration-layout/registration-layout.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';

// const routes: Routes = [
//   {
//     path : "",component: StudentRegistrationComponent,
//     children : [
//       { path: 'admission', component: AdmissionComponent, },
//     ]
//   }
// ];
const routes: Routes = [
  {
    path: '', component: RegistrationLayoutComponent,data: { breadcrumb: 'Classes', icon: '' } ,
    children : [
      { path: '', component: StudentRegistrationComponent},
      { path: 'admission', component: AdmissionComponent, data: { breadcrumb: 'Admission', icon: 'grid_view' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
