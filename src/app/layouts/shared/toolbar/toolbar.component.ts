import { Component, Input, OnInit } from '@angular/core';
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
  constructor(
    public routingService : RoutingService
  ) { }

  ngOnInit(): void {
  }

}
