import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  elem:any;
  show_fullscreen = true;
  close_fullscreen = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
  ) {
    
  }
  
  ngOnInit() {
    this.elem = document.documentElement;
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    }
  }

}
