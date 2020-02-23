import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
// ng generate  mycomponent_name --module app-routing 
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path : '' ,component: SidenavComponent},
  { path: 'about' , component : AboutComponent },
  { path : 'login' ,component: LoginComponent},

];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    SidenavComponent,
    NavigationComponent,
    AboutComponent,
    LoginComponent,
  ],

  declarations: [
    SidenavComponent,
    NavigationComponent,
    AboutComponent,
    LoginComponent,
  ]
})
export class AppRoutingModule { }
