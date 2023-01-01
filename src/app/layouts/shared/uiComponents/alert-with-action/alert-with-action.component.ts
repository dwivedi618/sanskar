
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { HELPER } from 'src/app/utils/helpers';

@Component({
  selector: 'app-alert-with-action',
  templateUrl: './alert-with-action.component.html',
  styleUrls: ['./alert-with-action.component.css']
})
export class AlertWithActionComponent implements OnInit {
  messages = [];
  action: any;
  icon : string;
  actionIcon = {
    delete : 'delete',
    remove : 'delete',
  }



  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<AlertWithActionComponent>,

    @Optional() @Inject(MAT_SNACK_BAR_DATA) private data: { message: string | string[], action: string } = { message: ['Are you sure?'], action: 'Yes' }) {
    // this.local_data = data;
    if (data) {
      if(HELPER.isArray(data['message'])){
        this.messages = data.message as string[];
      }else{
        this.messages.push(data.message);
      }
      this.action = data.action;
      this.icon = this.actionIcon[data.action.toLowerCase()] || 'lightbulb';
    }
    console.log(data, this.messages, this.action);

  }



  ngOnInit(): void {
  }

}
