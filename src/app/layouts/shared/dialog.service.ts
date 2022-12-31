import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';


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
      data: data,
    });
    cdialogRef.afterClosed().subscribe(result => {
      afterCloseResult.next(result)
    })
    return afterCloseResult.asObservable();
  }



}