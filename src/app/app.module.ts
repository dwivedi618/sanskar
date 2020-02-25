import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';


import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavmenusComponent } from './sidenav/sidenavmenus/sidenavmenus.component';

import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';

import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavmenusComponent,
    NavigationComponent,
    AboutComponent,
    LoginComponent,
    StudentsComponent,
    
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    
    FormsModule,
    
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
