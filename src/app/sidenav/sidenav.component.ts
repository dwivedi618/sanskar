import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  login = false;
  isFullOpen = true;
  contentMargin = 16;
  showFiller = false;
  constructor() { }

  ngOnInit() {
  }
  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 720) {
        return true;
    } else {
        return false;
    }
  }
  mySidenavToggle(){
    
    this.isFullOpen = !this.isFullOpen;
    if(!this.isFullOpen){
      this.contentMargin = 4;

    }else{
      this.contentMargin = 16;
    }
  }
  
}
