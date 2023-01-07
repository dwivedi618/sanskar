import { Component, Input, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { MainMenu } from '../uiComponents/left-sidebar-menu/sidebar.menus';
@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit {
  @Input() public tabs : MainMenu[] = null ;
  activeTab : string = this.tabs && this.tabs[0].id
  constructor() { }
  ngOnInit(): void {
  }

}
