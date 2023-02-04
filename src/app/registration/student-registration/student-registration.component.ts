import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AcademicYearActionService } from 'src/app/master-data/academic-year/services/academic-year-action.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { API_ROUTES, CommonService } from 'src/app/services/common.service';
import { UiService } from 'src/app/services/ui.service';
import { AdmissionRequestListService } from '../services/admission-request-list.service';
import { QuickRegistrationService } from '../services/quick-registration.service';
import { admissionRequestAction } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';
import { RegistrationActionService } from '../services/registration-action.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  displayedColumns = ['firstName',"academicSession","studentMobile","gender","place","registrationCompleted"];
  Action = Action;
  admissionRequestAction=admissionRequestAction
  isLoading: boolean = true;
  admissionRequestList: any;

  constructor(
    private uiService: UiService,
    private dialogService: DialogService,
    private commonService: CommonService,
    private registrationActionService : RegistrationActionService,
    private admissionRequestApiService : AdmissionRequestListService,
  ) { }

  ngOnInit() {
    this.getAdmissionRequestList();
  }

  getAdmissionRequestList() {
    this.uiService.loader.show("Fetching admissionRequestList...");
    this.admissionRequestApiService.admissionRequestList().subscribe((result) => {
      console.log("getQuickRegistrationFormJson", result);
      this.admissionRequestList = result.data || null;
      this.uiService.loader.hide();
      // this.alertService.alertComponent(result.message);
    }, (error) => {
      console.log("getMasterFeeCategory error", error);
      // this.uiService.loader.hide();
    })
  }

  manageQuickRegistration() {
    this.dialogService.manageQuickRegistration().subscribe(()=>{this.refresh()});
  }

  actionTriggerhandler(event: { action: Action, data: any }) {
    let { action, data } = event;
    console.log(true);
    
    this.menuClickHandler(action, data);
  }


  refresh() {
    this.getAdmissionRequestList()
  }
  menuClickHandler(action,data){
    console.log("action",action,data)
    this.registrationActionService.actionTriggered(action,data).subscribe(()=>{
      this.refresh();
    })
  }

}
