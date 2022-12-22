import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from './topbar/topbar.component';
import { MaterialModule } from 'src/app/material.module';
import { LeftSidebarMenuComponent } from './left-sidebar-menu/left-sidebar-menu.component';
import { AlertComponent } from 'src/app/alert/alert.component';
import { SearchComponent } from './search/search.component';
import { RightSidebarMenuComponent } from './right-sidebar-menu/right-sidebar-menu.component';
import { AlertWithActionComponent } from './alert-with-action/alert-with-action.component';
import { JsonFormComponent } from './json-form/json-form.component';
import { FeeFrequencyPipe } from './customPipes/fee-frequency.pipe';

@NgModule({
  declarations: [
    TopbarComponent,
    LeftSidebarMenuComponent,
    AlertComponent,
    SearchComponent,
    RightSidebarMenuComponent,
    AlertWithActionComponent,
    JsonFormComponent,
    FeeFrequencyPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TopbarComponent,
    LeftSidebarMenuComponent,
    RightSidebarMenuComponent,
    SearchComponent,
    AlertComponent,
    AlertWithActionComponent,
    JsonFormComponent,
    RouterModule,
    FeeFrequencyPipe
  ]
})
export class SharedModule { }
