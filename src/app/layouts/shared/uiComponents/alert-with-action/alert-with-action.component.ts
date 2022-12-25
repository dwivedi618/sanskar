
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-with-action',
  templateUrl: './alert-with-action.component.html',
  styleUrls: ['./alert-with-action.component.css']
})
export class AlertWithActionComponent implements OnInit {
  local_data: string;
  message: any;
  status: number;
  action: any;

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<AlertWithActionComponent>,

    @Optional() @Inject(MAT_SNACK_BAR_DATA) public data: string) { 
      // this.local_data = data;
      if(data){
        this.message = data['message'];
        this.action = data['action'] ;
      }
      console.log(data,this.message,this.action);

    }



  ngOnInit(): void {
  }
 
}
