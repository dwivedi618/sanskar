import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MainMenu } from '../uiComponents/left-sidebar-menu/sidebar.menus';
@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit {
  @Input() public tabs: MainMenu[] = null;
  @Input() public selectedTabId: string;
  @Input() public sticky : boolean;
  @Input() public color : ThemePalette = "primary";

  @Output() onChange = new EventEmitter<MainMenu>();
  activeTab: string = this.tabs && this.tabs[0].id;
  constructor() { }
  ngOnInit(): void {
  }

  tabClickHandler(tab: MainMenu) {
    this.onChange.emit(tab);
  }


  public get activeTabId(): string {
    let activeTab = this.tabs && this.tabs[0].id;
    if (!(this.tabs && this.selectedTabId)) {
      return activeTab;
    }
    activeTab = this.tabs.find((tab: MainMenu) => {
      return tab.id == this.selectedTabId
    })?.id || this.tabs[0].id;
    console.log("activeTabMenu",activeTab);
    return activeTab
  }

}
