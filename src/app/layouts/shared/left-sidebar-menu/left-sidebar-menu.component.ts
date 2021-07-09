import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AdmissionComponent } from 'src/app/admission/admission.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-left-sidebar-menu',
  templateUrl: './left-sidebar-menu.component.html',
  styleUrls: ['./left-sidebar-menu.component.css']
})
export class LeftSidebarMenuComponent implements OnInit {
  panelOpenState :boolean
  configUrls = [
    { name : 'Fee Structure',url : './configuration/fee-structure' },
    { name : 'Fee Category',url : './configuration/master-fee-category' },
    { name : 'Registered Classes',url : './configuration/master-standard' },

  ]
  activeLink: any;
  constructor(
    private dialog : MatDialog,
    private router : Router,
    private route : ActivatedRoute
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      const activeLinkWithParam = (event.url.split('/').pop())      
      console.log("activeLinkWithParam", activeLinkWithParam);
      this.activeLink = activeLinkWithParam.split('?')[0]
      console.log("activeLink", this.activeLink);

    });
   }

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

    openConfigurationRoute(event){
      this.router.navigate(['./configuration'])
    }

}
