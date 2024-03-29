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
import { LeftSidebarMenuComponent } from '../layout/left-sidebar-menu/left-sidebar-menu.component';
import { LoaderComponent } from './uiComponents/loader/loader.component';
import { MenuButtonComponent } from './uiComponents/menu-button/menu-button.component';
import { RightSidebarMenuComponent } from '../layout/right-sidebar-menu/right-sidebar-menu.component';
import { SearchComponent } from './uiComponents/search/search.component';
import { AgePipe } from './customPipes/age.pipe';
import { InputMaskDirective } from './customDirectives/input-mask.directive';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SkeltonLoaderComponent } from './skelton-loader/skelton-loader.component';
import { InstituteHeaderComponent } from './institute-header/institute-header.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { JsonFormArrayComponent } from './json-form-array/json-form-array.component';
import { AvatarComponent } from './avatar/avatar.component';
import { LabelPipe } from './customPipes/label.pipe';
import { TabNavComponent } from './tab-nav/tab-nav.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { TableComponent } from './table/table.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AvatarDescriptionComponent } from './avatar-description/avatar-description.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { QuickRegistrationComponent } from 'src/app/registration/quick-registration/quick-registration.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SidebarProfileComponent } from './sidebar-profile/sidebar-profile.component';

@NgModule({
  declarations: [
    TopbarComponent,
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
    SkeltonLoaderComponent,
    InstituteHeaderComponent,
    DialogHeaderComponent,
    JsonFormArrayComponent,
    AvatarComponent,
    LabelPipe,
    TabNavComponent,
    MilestoneComponent,
    TableComponent,
    BreadcrumbComponent,
    AvatarDescriptionComponent,
    ToolbarComponent,
    QuickRegistrationComponent,
    DropdownComponent,
    SidebarProfileComponent
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
    JsonFormArrayComponent,
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
    ImageCropperComponent,
    SkeltonLoaderComponent,
    InstituteHeaderComponent,
    DialogHeaderComponent,
    AvatarComponent,
    LabelPipe,
    TabNavComponent,
    MilestoneComponent,
    TableComponent,
    BreadcrumbComponent,
    ToolbarComponent,
    QuickRegistrationComponent,
    DropdownComponent,
    SidebarProfileComponent
  ]
})
export class SharedModule { }
