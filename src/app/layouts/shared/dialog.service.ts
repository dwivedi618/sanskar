import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ManageFeeCategoryComponent } from 'src/app/master-data/fee-category/manage-fee-category/manage-fee-category.component';
import { ManageMasterStandardComponent } from 'src/app/master-data/standard/manage-master-standard/manage-master-standard.component';
import { Action } from './uiComponents/menu-button/actions.enum';
import { ManageFeeStructureComponent } from 'src/app/master-data/fee-structure/manage-fee-structure/manage-fee-structure.component';
import { ManageSectionComponent } from 'src/app/master-data/standard/section/manage-section/manage-section.component';
import { ManageAcademicYearComponent } from 'src/app/master-data/academic-year/manage-academic-year/manage-academic-year.component';
import { ManageInstituteInformationComponent } from 'src/app/institute/manage-institute-information/manage-institute-information.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogCloseData = new Subject;
  setData(data) {
    this.dialogCloseData.next(data)
  }
  resetData() {
    this.dialogCloseData.next()
  }

  constructor(private dialog: MatDialog) { }

  openImageCroppper(data): Observable<any> {

    let afterCloseResult = new Subject;
    const cdialogRef = this.dialog.open(ImageCropperComponent, {
      width: '60rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: true,
      disableClose: true,
      panelClass: 'image-cropper-dialog',
      data: data,
    });
    cdialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageFeeCategory(dataObj = {}, action: Action = Action.ADD) {
    let afterCloseResult = new Subject;
    const data = dataObj
    const dialogRef = this.dialog.open(ManageFeeCategoryComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      // panelClass : 'dialog-container-pt-0',
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageInstituteInformation(dataObj = {}, action: Action = Action.ADD) {
    let afterCloseResult = new Subject;
    const data = dataObj
    const dialogRef = this.dialog.open(ManageInstituteInformationComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageAcademicYear(dataObj = {}, action: Action = Action.ADD) {
    let afterCloseResult = new Subject;
    const data = dataObj
    const dialogRef = this.dialog.open(ManageAcademicYearComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      // panelClass : 'dialog-container-pt-0',
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageSection(dataObj = {}, action: Action = Action.ADD) {
    let afterCloseResult = new Subject;
    const data = dataObj
    const dialogRef = this.dialog.open(ManageSectionComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      // panelClass : 'dialog-container-pt-0',
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageMasterStandard(data = {}, action: Action = Action.ADD) {
    let afterCloseResult = new Subject;
    const dialogRef = this.dialog.open(ManageMasterStandardComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      // panelClass : 'dialog-container-pt-0',
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageFeeStructure(dataObj = {}, action: Action = Action.ADD) {

    let afterCloseResult = new Subject;
    const data = dataObj
    const dialogRef = this.dialog.open(ManageFeeStructureComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      // panelClass : 'dialog-container-pt-0',
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  open(dataObj = {}, action: Action = Action.ADD, component: any) {

    let afterCloseResult = new Subject;
    const data = dataObj
    const dialogRef = this.dialog.open(component, {
      width: '70rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: true,
      disableClose: true,
      data: { data, action }
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

}