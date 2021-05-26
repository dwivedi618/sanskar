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

@NgModule({
  declarations: [TopbarComponent, LeftSidebarMenuComponent,AlertComponent, SearchComponent, RightSidebarMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports : [
    CommonModule,
    MaterialModule,
    FormsModule,
    TopbarComponent,
    LeftSidebarMenuComponent,
    RightSidebarMenuComponent,
    SearchComponent,
    AlertComponent,
    RouterModule
  ]
})
export class SharedModule { }
