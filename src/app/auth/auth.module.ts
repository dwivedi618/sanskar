import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';




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
