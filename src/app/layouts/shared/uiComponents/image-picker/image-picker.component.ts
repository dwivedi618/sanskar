import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  imagePreview : string = '';
  @Output() onImageSelect = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  fileUploadReset() {
    if (this.imagePreview) {
      this.imagePreview = '';
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.getBase64(file);
  }
  private getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.onImageSelect.emit(this.imagePreview);
    };
  }
}
