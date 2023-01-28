import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() label : string = '';
  @Input() data : {_id , name}[] = [];
  selectedOpt : string;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(selected : { _id,name }){
    this.selectedOpt = selected.name
  }

}
