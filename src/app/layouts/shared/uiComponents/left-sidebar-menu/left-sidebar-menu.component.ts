import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AdmissionComponent } from 'src/app/admission/admission.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { MainMenu } from './sidebar.menus';

@Component({
  selector: 'app-left-sidebar-menu',
  templateUrl: './left-sidebar-menu.component.html',
  styleUrls: ['./left-sidebar-menu.component.scss']
})
export class LeftSidebarMenuComponent implements OnInit {
  panelOpenState: boolean
  public menus: MainMenu[];
  activeLink: any;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private commonSerivice: CommonService
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const activeLinkWithParam = (event.url.split('/').pop())
      this.activeLink = activeLinkWithParam.split('?')[0]
    });
  }

  ngOnInit(): void {
    this.commonSerivice[API_SERVICE_METHODS.getMainMenus]().subscribe((data: MainMenu[]) => { this.menus = data })
  }

  newRegistration(obj) {
    obj.action = 'submitFee';
    const dialogRef = this.dialog.open(AdmissionComponent, {
      width: '70rem',
      maxWidth: '100vw',
      height: "40rem",
      maxHeight: '100vh',
      hasBackdrop: false,
      data: { obj }
    })

  }

  openConfigurationRoute(event) {
    this.router.navigate(['./configuration'])
  }

}
