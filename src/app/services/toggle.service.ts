import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor() { }
  isOpen = false;
  toggleSidenav(){
    this.isOpen = !this.isOpen;
    console.log("called from sidenav through toogleService",this.isOpen);

  }
}
