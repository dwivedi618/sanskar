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
  status: number;

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<AlertComponent>,

    @Optional() @Inject(MAT_SNACK_BAR_DATA) public data: string) { 
      // this.local_data = data;
      if(data){
        this.message = data['message'];
        this.status = data['status'] || '';
      }
      console.log(data,this.message,this.status);

    }



  ngOnInit(): void {
  }
 
}
