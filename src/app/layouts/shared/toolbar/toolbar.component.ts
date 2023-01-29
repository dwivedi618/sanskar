import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassApiService } from 'src/app/master-data/standard/services/class-api.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() title = '';
  @Input() sticky :boolean = true;
  @Input() routerLink : string = null;
  @Output() onDropDownSelect = new EventEmitter<{_id : String , name : String}>();
  @Input () dropdowns = [];
  constructor(
    public routingService : RoutingService,
    public classApiService : ClassApiService
  ) { }

  ngOnInit(): void {
  }

  onClassSelect(selectedClass){
    this.onDropDownSelect.emit(selectedClass);
  }

}
