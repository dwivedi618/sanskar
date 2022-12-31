import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './uiComponents/topbar/topbar.component';
import { MaterialModule } from 'src/app/material.module';
import { AlertComponent } from 'src/app/alert/alert.component';
import { FeeFrequencyPipe } from './customPipes/fee-frequency.pipe';
import { JsonFormComponent } from './json-form/json-form.component';
import { AlertWithActionComponent } from './uiComponents/alert-with-action/alert-with-action.component';
import { BulkActionsComponent } from './uiComponents/bulk-actions/bulk-actions.component';
import { EmptyListComponent } from './uiComponents/empty-list/empty-list.component';
import { FilterComponent } from './uiComponents/filter/filter.component';
import { ImagePickerComponent } from './uiComponents/image-picker/image-picker.component';
import { LeftSidebarMenuComponent } from './uiComponents/left-sidebar-menu/left-sidebar-menu.component';
import { LoaderComponent } from './uiComponents/loader/loader.component';
import { MenuButtonComponent } from './uiComponents/menu-button/menu-button.component';
import { RightSidebarMenuComponent } from './uiComponents/right-sidebar-menu/right-sidebar-menu.component';
import { SearchComponent } from './uiComponents/search/search.component';
import { AgePipe } from './customPipes/age.pipe';
import { InputMaskDirective } from './customDirectives/input-mask.directive';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';

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
    AgePipe,
    MenuButtonComponent,
    FilterComponent,
    BulkActionsComponent,
    EmptyListComponent,
    LoaderComponent,
    ImagePickerComponent,
    InputMaskDirective,
    ImageCropperComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    
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
    AgePipe,
    MenuButtonComponent,
    FilterComponent,
    BulkActionsComponent,
    EmptyListComponent,
    LoaderComponent,
    ImagePickerComponent,
    ReactiveFormsModule,
    InputMaskDirective,
    ImageCropperModule,
    ImageCropperComponent
  ]
})
export class SharedModule { }
