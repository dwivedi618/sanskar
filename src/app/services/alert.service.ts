import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackBar: MatSnackBar,
    ) { }

  alert(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
  alertLb(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
  alertRT(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  alertError(message: string, action: string, className: string) {

    this.snackBar.open(message, action, {
     duration: 2000,
     verticalPosition: 'top',
     horizontalPosition: 'end',
     panelClass: [className],
   });
}
  
}
