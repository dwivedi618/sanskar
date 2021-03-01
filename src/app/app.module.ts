import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
// import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'


import { NavigationComponent } from './navigation/navigation.component';

// import { AdmissionComponent } from './admission/admission.component';
  

import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { NavComponent } from './nav/nav.component';

import { AdmissionModule } from './admission/admission.module'


import { LayoutComponent } from './layouts/layout/layout.component';
import { VerticalComponent } from './layouts/vertical/vertical.component';
import { SharedModule } from './layouts/shared/shared.module';
import { LayoutModule } from './layouts/layout/layout.module';





@NgModule({
  declarations: [
    
    AppComponent,
   
    NavigationComponent,
    // FeesComponent,
    ProfileComponent,
    EditComponent,
    SettingsComponent,
    
    NavComponent,
    
    LayoutComponent,
    
    VerticalComponent,
    
   
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    AdmissionModule,
    LayoutModule,

    
    
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    
  ],
  // entryComponents: [ FeesComponent],
  providers: [AuthenticationService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
