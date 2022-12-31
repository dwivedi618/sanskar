import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  imagePreview : string = '';
  @Output() onImageSelect = new EventEmitter<string>();
  constructor(private dialogService : DialogService) { }

  file : File;
  fileEvent : Event;
  ngOnInit(): void {
  }
  fileUploadReset() {
    if (this.imagePreview) {
      this.imagePreview = '';
      this.onImageSelect.emit(this.imagePreview);
    }
  }
  onImagePicked(event: Event) {
    this.fileEvent = event;
    this.file = (event.target as HTMLInputElement).files[0];
    this.getBase64(this.file);
  }
  private getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.onImageSelect.emit(this.imagePreview);
    };
  }

  onClickCropBtn(){
    this.dialogService.openImageCroppper(this.fileEvent).subscribe(croppedImageBase64 =>{
      console.log("croppedImageBase64",croppedImageBase64)
      croppedImageBase64 ? this.imagePreview = croppedImageBase64 : this.imagePreview;
      this.onImageSelect.emit(this.imagePreview);
    })
  }
}
