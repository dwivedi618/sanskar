import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../layouts/shared/shared.module';




@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports : [
    AuthRoutingModule
  ]
})
export class AuthModule { }
