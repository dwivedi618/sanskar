import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';


// const appRoutes:Routes = [
//   { path: '' , component : AboutComponent },

// ];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
