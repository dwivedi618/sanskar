import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionMenus } from './action-menus';
import { Action } from './actions.enum';
import { Menu } from './menu.type';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent{
  @Input() public menus:Menu[] = ActionMenus ;
  @Output() click = new EventEmitter<Action>();
  constructor() { }
  actionClickHandler(menu:Menu){
    this.click.emit(menu.menuId);
  }
}
