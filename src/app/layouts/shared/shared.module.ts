import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [RightsidebarComponent, TopbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports : [
    CommonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class SharedModule { }
