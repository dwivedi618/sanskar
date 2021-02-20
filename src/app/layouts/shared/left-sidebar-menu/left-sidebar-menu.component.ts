import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AdmissionComponent } from 'src/app/admission/admission.component';

@Component({
  selector: 'app-left-sidebar-menu',
  templateUrl: './left-sidebar-menu.component.html',
  styleUrls: ['./left-sidebar-menu.component.css']
})
export class LeftSidebarMenuComponent implements OnInit {

  constructor(
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  newRegistration(obj){
    obj.action = 'submitFee';
       const dialogRef = this.dialog.open(AdmissionComponent,{
         width:'70rem',
         maxWidth: '100vw',
         height : "40rem",
         maxHeight:'100vh',
         hasBackdrop : false,
         data : {obj}
       })
    
    }

}
