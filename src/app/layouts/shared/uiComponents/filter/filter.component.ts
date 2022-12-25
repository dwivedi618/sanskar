import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() onEvent = new EventEmitter<Event>()
  constructor() { }
  ngOnInit(): void {
  }
  onTyping(event: Event){
    this.onEvent.emit(event);
  }
}
