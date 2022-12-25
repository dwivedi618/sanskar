import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AdmissionComponent } from 'src/app/admission/admission.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { menus as menus} from './sidebar.menus';

@Component({
  selector: 'app-left-sidebar-menu',
  templateUrl: './left-sidebar-menu.component.html',
  styleUrls: ['./left-sidebar-menu.component.scss']
})
export class LeftSidebarMenuComponent implements OnInit {
  panelOpenState :boolean
  configUrls = [
    { name : 'Fee Structure',url : './configuration/fee-structure' },
    { name : 'Fee Category',url : './configuration/master-fee-category' },
    { name : 'Registered Classes',url : './configuration/master-standard' },

  ]
  menus = menus;
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
      this.activeLink = activeLinkWithParam.split('?')[0]

    });
   }

  ngOnInit(): void {
    // alert(JSON.stringify(menus,null,2))
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
