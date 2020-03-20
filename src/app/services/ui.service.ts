import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isDarkTheme = false;
  constructor(
    private _snackBar: MatSnackBar,
    ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }

  toggleFromStudent(){

  };
  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme;
    console.log("isDarkTheme",this.isDarkTheme);
    } 
}
