import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  local_data: string;
  message: any;
  username: any;

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<AlertComponent>,

    @Optional() @Inject(MAT_SNACK_BAR_DATA) public data: string) { 
      // this.local_data = data;
      if(data){
        this.message = data['message'];
        this.username = data['user'] || '';
      }
      console.log(data,this.message,this.username);

    }



  ngOnInit(): void {
  }
 
}
