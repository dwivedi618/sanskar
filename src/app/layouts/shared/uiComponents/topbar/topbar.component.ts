import { ToggleService } from '../../../../services/toggle.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  
  isListView = true ;
  isLoading: boolean = true;
  constructor(
    private toggleService : ToggleService,
    private dialogService : DialogService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  /**
   * menu sidebar open and close state control
   */
  public toggleLeftSidebar(){
    this.toggleService.leftSidebarToggle.emit()
  }
  manageQuickRegistration() {
    this.dialogService.manageQuickRegistration().subscribe(()=>{this.refresh()});
  }
    refresh(){

  }
}
