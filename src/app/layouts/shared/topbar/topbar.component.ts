import { ToggleService } from './../../../services/toggle.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  isListView = true ;
  constructor(
    private toggleService : ToggleService
  ) { }

  ngOnInit() {
  }
  /**
   * menu sidebar open and close state control
   */
  private toggleLeftSidebar(){
    this.toggleService.leftSidebarToggle.emit()
  }

}
