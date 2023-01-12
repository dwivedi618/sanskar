import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { RoutingService } from 'src/app/services/routing.service';
import { MainMenu } from '../uiComponents/left-sidebar-menu/sidebar.menus';
@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit {
  @Input() public tabs: MainMenu[] = null;
  @Input() public selectedTabId: string;
  @Input() public sticky: boolean;
  @Input() public color: ThemePalette = "primary";

  @Output() onChange = new EventEmitter<MainMenu>();
  activeTab: string = this.tabs && this.tabs[0].id;
  constructor(private routingService: RoutingService) { }
  ngOnInit(): void {

  }

  tabClickHandler(tab: MainMenu) {
    this.onChange.emit(tab);
  }


  public get activeTabId(): string {
    console.log("active tab get called")
    
 
    let activeTab = this.tabs.find((tab: MainMenu) => { return tab.id == this.selectedTabId }) || this.tabs[0];
    let activeTabId = activeTab.id
    this.routingService.onTriggerStudentTab(activeTab?.subMenus);

    return activeTabId
  }

}
