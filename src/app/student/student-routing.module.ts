import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentOverviewComponent } from './student-profile-layout/overview/student-overview.component'
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { AdmissionFormPrintLayoutComponent } from './admission-form-print-layout/admission-form-print-layout.component';
import { StudentProfileLayoutModule } from './student-profile-layout/student-profile-layout.module';
import { ProfileUpdateLayoutComponent } from './profile-update-layout/profile-update-layout.component';
import { StudentFormComponent } from './forms/student-form/student-form.component';
import { ParentFormComponent } from './forms/parent-form/parent-form.component';
const studentroutes: Routes = [
    {
        path: '', component: StudentLayoutComponent,
        children: [
            { path: '', component: StudentsListComponent },
            {
                path: '',
                loadChildren: () => import('./student-profile-layout/student-profile-layout.module')
                .then(m => m.StudentProfileLayoutModule),
                
            },
            { 
                path: 'overview/update', 
                component: ProfileUpdateLayoutComponent , 
                children : [
                  { path : '' , component : StudentFormComponent ,data:{breadcrumb : 'Update'}},
                  { path : 'parent' , component : ParentFormComponent ,data:{breadcrumb : 'Update'}}

                ],
                data:{breadcrumb : 'Overview'}
              },
            { path: 'print', component: AdmissionFormPrintLayoutComponent },
        ]
    }
];
@NgModule({
    imports: [
        RouterModule,
        RouterModule.forChild(studentroutes),
    ],
    exports: [
        RouterModule,

    ],
})

export class StudentRoutingModule { }