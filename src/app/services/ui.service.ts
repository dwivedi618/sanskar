import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
export interface Loader {
  isLoading: Boolean,
  oMessage: String
}

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loader = {
    state: new BehaviorSubject<Loader>({ isLoading: false, oMessage: "Loading..." }),
    hide() {
      this.state.next({ isLoading: false, oMessage: "Retry" });
    },
    /**
     *@param oMessage pass any message   
     */
    show(oMessage: string = "Loading...") {
      this.state.next({ isLoading: true, oMessage: oMessage });
    }
  }

  isDarkTheme = false;
  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }


  toggleFromStudent() {

  };
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    console.log("isDarkTheme", this.isDarkTheme);
  }
}
