import { Component, Input, OnInit } from '@angular/core';
import { Action } from '../uiComponents/menu-button/actions.enum';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit {

  @Input() public dialogData : { action : Action , name : string}
  constructor() { }

  ngOnInit(): void {
  }

}
