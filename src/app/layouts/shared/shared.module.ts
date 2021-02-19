import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from './topbar/topbar.component';
import { MaterialModule } from 'src/app/material.module';
import { LeftSidebarMenuComponent } from './left-sidebar-menu/left-sidebar-menu.component';

@NgModule({
  declarations: [TopbarComponent, LeftSidebarMenuComponent],
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
    RouterModule
  ]
})
export class SharedModule { }
