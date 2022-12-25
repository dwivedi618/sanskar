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
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { FilterComponent } from './filter/filter.component';
import { BulkActionsComponent } from './bulk-actions/bulk-actions.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    TopbarComponent,
    LeftSidebarMenuComponent,
    AlertComponent,
    SearchComponent,
    RightSidebarMenuComponent,
    AlertWithActionComponent,
    JsonFormComponent,
    FeeFrequencyPipe,
    MenuButtonComponent,
    FilterComponent,
    BulkActionsComponent,
    EmptyListComponent,
    LoaderComponent
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
    FeeFrequencyPipe,
    MenuButtonComponent,
    FilterComponent,
    BulkActionsComponent,
    EmptyListComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
