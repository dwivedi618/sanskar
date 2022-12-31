import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  isCropperReady: boolean =false;
  constructor(
    private dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public file: Event,
    private alertService : AlertService
  ) {
    console.log("file event", file)

  }
  maintainAspectRatio :boolean =  true;

  ngOnInit(): void {
  }
  croppedImage: any = '';
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
    this.isCropperReady = true;
   
  }
  loadImageFailed() {
    // show message
    this.alertService.alertError("Cant't Crop this file","close",'red')
    this.dialogRef.close(false);
  }
  onDone(){

    this.dialogRef.close(this.croppedImage);
  }

}
