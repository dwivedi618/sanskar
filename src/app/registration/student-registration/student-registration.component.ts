import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {

  Action = Action;
  @Input() actions;
  @Output() actionTriggerd = new EventEmitter<{ action, data }>();
  isLoading: boolean = true;

  constructor(
    private dialogService : DialogService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  manageQuickRegistration() {
    this.dialogService.manageQuickRegistration().subscribe(()=>{this.refresh()});
  }

  refresh(){

  }

}
