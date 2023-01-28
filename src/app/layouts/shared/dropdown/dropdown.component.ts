import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent{
  @Input() label : string = '';
  @Input() data : {_id , name}[] = [];
  @Input() selected : {_id : String, name : String};
  selectedId = "";
  @Output() onSelect = new EventEmitter<{_id : String, name : String}>();
  dropdownSelectHandler(obj){
    this.selected = obj;
    this.onSelect.emit(obj);
  }
}
