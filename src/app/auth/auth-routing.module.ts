import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const authroutes: Routes = [
    { path: '', component: LoginComponent }
]

@NgModule({
    imports: [
        RouterModule,
        RouterModule.forChild(authroutes),

    ],
    exports : [
        RouterModule
    ]
})
export class AuthRoutingModule { }