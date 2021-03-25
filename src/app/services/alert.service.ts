import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../alert/alert.component';

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

alertComponent(message){
  // this.data.message = message;
  // this.data.user = user
  this.snackBar.openFromComponent(AlertComponent, {
    duration: 10000,
    data: {message},
    // panelClass: 'bg-mydark-1',
  });
}
  
}
