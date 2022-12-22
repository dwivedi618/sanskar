import { Component, Input, OnInit } from '@angular/core';
import { ActionMenus } from 'src/app/config/menus';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  @Input() public menus = ActionMenus ;
  constructor() { }

  ngOnInit(): void {
  }

}
