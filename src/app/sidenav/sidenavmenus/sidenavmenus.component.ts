import { Component, OnInit } from '@angular/core';
import { AdmissionComponent } from 'src/app/admission/admission.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sidenavmenus',
  templateUrl: './sidenavmenus.component.html',
  styleUrls: ['./sidenavmenus.component.css']
})
export class SidenavmenusComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  newRegistration(obj){
    
    obj.action = 'registration';
       const dialogRef = this.dialog.open(AdmissionComponent,{
         width:'70vw',
         maxWidth: '100%',
         disableClose: true,
         data : {obj}
       })
       
  }
}
