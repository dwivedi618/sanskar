import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  public leftSidebarToggle : EventEmitter<any> = new EventEmitter();

  constructor() { }
  isOpen = false;
  toggleSidenav(){
    this.isOpen = !this.isOpen;
    console.log("toogleService",this.isOpen);

  }
}
