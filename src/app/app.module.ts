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
import { AboutComponent } from './studentcompletedetails/about/about.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { AdmissionComponent } from './admission/admission.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentcompletedetailsComponent } from './studentcompletedetails/studentcompletedetails.component';
import { FeestructureComponent } from './feestructure/feestructure.component';
import { FeesComponent } from './fees/fees.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings/settings.component';
import { ParentsComponent } from './studentcompletedetails/parents/parents.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavmenusComponent,
    NavigationComponent,
    AboutComponent,
    LoginComponent,
    StudentsComponent,
    AdmissionComponent,
    DashboardComponent,
    StudentcompletedetailsComponent,
    FeestructureComponent,
    FeesComponent,
    ProfileComponent,
    EditComponent,
    SettingsComponent,
    ParentsComponent,  
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    
  ],
  entryComponents: [AdmissionComponent ,FeesComponent],
  providers: [AuthenticationService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
