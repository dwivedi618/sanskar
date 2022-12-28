import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AlertService } from './services/alert.service';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonFormService } from './services/json-form.service';

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AdmissionModule,
    LayoutModule,
  ],
  exports: [
    SharedModule,
  ],
  providers: [AuthenticationService, HttpClient, AlertService, JsonFormService, {
    provide: MatSnackBarRef,
    useValue: {}
  },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },],
  bootstrap: [AppComponent]
})
export class AppModule { }
