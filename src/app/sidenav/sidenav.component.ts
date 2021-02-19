import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToggleService} from "../services/toggle.service";
import { UiService } from '../services/ui.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  login = false;
  isFullOpen = true;
  isDarkTheme = false;
  isUnicornDarkTheme = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    );
    
    

  constructor(
    private uiService : UiService,
    private breakpointObserver: BreakpointObserver,
    private toggleService:ToggleService) { }

  ngOnInit() {

  }
  ngOnChanges(){
    this.isUnicornDarkTheme = this.uiService.isDarkTheme;
    console.log("from Sidenav isUnicornDarkTheme",this.isUnicornDarkTheme);
  }
 
  sidenavToggle(){
      this.isFullOpen = !this.isFullOpen;
       console.log("full Open",this.isFullOpen);
    if(!this.isFullOpen){
      // this.Margin = 4;

    }else{
      // this.contentMargin = 16;
    }
  }
  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 720) {
      
      console.log("isLargeScreen",true);
        return true;
    } else {
      console.log("isLargeScreen",false);
        return false;

    }
  }
  mySidenavToggle(){
    this.toggleService.toggleSidenav();
    
    
    // this.isFullOpen = !this.isFullOpen;
    // if(!this.isFullOpen){
    //   // this.contentMargin = 4;

    // }else{
    //   // this.contentMargin = 16;
    // }
  }
  
}
