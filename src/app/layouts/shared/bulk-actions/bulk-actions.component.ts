import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionMenus } from '../menu-button/action-menus';
import { Action } from '../menu-button/actions.enum';
import { Menu } from '../menu-button/menu.type';
import { bulkActionMenus } from './bulk-action-menu';

@Component({
  selector: 'app-bulk-actions',
  templateUrl: './bulk-actions.component.html',
  styleUrls: ['./bulk-actions.component.scss']
})
export class BulkActionsComponent implements OnInit {
  @Input() public menus:Menu[]= bulkActionMenus ;
  @Output() onMenuClick = new EventEmitter<Action>();
  constructor() { }
  ngOnInit(): void {

  }
  actionClickHandler(menu:Menu){
    this.onMenuClick.emit(menu.menuId);
  }
}
