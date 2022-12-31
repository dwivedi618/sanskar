import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ManageFeeCategoryComponent } from 'src/app/master-data/fee-category/manage-fee-category/manage-fee-category.component';


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
      panelClass : 'image-cropper-dialog',
      data: data,
    });
    cdialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }

  manageFeeCategory() {
    let afterCloseResult = new Subject;
    const data = {}
    const dialogRef = this.dialog.open(ManageFeeCategoryComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      // panelClass : 'dialog-container-pt-0',
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }



}