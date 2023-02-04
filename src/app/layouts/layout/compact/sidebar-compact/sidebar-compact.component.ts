import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdmissionComponent } from 'src/app/admission/admission.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { RoutingService } from 'src/app/services/routing.service';
import { MainMenu, SubMenu } from '../../left-sidebar-menu/sidebar.menus';
import { Menu } from 'src/app/layouts/shared/uiComponents/menu-button/menu.type';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar-compact',
  templateUrl: './sidebar-compact.component.html',
  styleUrls: ['./sidebar-compact.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }), //apply default styles before animation starts
        animate(
          "750ms ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateX(0)" }), //apply default styles before animation starts
        animate(
          "600ms ease-in-out",
          style({ width : 0,opacity: 0, transform: "translateX(-100%)" })
        )
      ])
    ]),
  ]
})
export class SidebarCompactComponent implements OnInit {
  panelOpenState: boolean = true;
  public menus: MainMenu[];
  activeLink: any;
  showOverlay: boolean;
  sidebarSubMenuState = "in";
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private commonSerivice: CommonService,
    private routingSerivice: RoutingService,

  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const activeLinkWithParam = (event.url.split('/').pop())
      this.activeLink = activeLinkWithParam.split('?')[0]
    });
  }

  ngOnInit(): void {
    this.routingSerivice.subMenus
    this.commonSerivice[API_SERVICE_METHODS.getMainMenus]().subscribe((data: MainMenu[]) => { this.menus = data })
  }



  openConfigurationRoute(path:string) {
    this.router.navigate([`./${path}`])
  }

  setSubMenu(menu:SubMenu){
    console.log("menu.subMenus",menu.subMenus);
    this.routingSerivice.onTriggerMenu(menu.subMenus)
    
  }

  menuClickHandler(menu:SubMenu){
    console.log(menu);
    // if(!menu.subMenus){
      this.router.navigate([menu.path]);
    // }
    if(menu?.subMenus && menu.subMenus.length){
      this.setSubMenu(menu)
      // this.openSubMenus(menu.subMenus);
      this.showOverlay = !this.showOverlay;
      this.toggleMenu();
      
    }
  }

  openSubMenus(menu:SubMenu[]){

  }

  close(){
    this.showOverlay = false;
  }
  toggleMenu(){
    this.sidebarSubMenuState = this.sidebarSubMenuState === 'out' ? 'in' : 'out';
    console.log("state", this.sidebarSubMenuState)
  }

}

