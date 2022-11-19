
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AlertComponent } from '../alert/alert.component';
import { AlertWithActionComponent } from '../layouts/shared/alert-with-action/alert-with-action.component';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  action = new Subject<string>()
  setAction(action){
    this.action.next(action) 
  }
  resetAction(){
    this.action.next()
  }

  constructor(
    private snackBar: MatSnackBar,
    private snackBarWithActionRef: MatSnackBarRef<AlertWithActionComponent>,

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

alertWithAction(message ,action ) : Observable<any>{

  const snackbarRef = this.snackBar.openFromComponent(AlertWithActionComponent, {
    duration: 10000,
    data: { message , action },
    // panelClass: 'bg-mydark-1',
  });
  snackbarRef.onAction().subscribe(() => {
    this.setAction(action);
  });
  return this.action.asObservable()
}
  
}
