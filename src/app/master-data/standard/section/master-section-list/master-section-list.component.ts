import {  Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UiService } from 'src/app/services/ui.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { SectionActionService } from '../services/section-action.service';

@Component({
  selector: 'app-master-section-list',
  templateUrl: './master-section-list.component.html',
  styleUrls: ['./master-section-list.component.scss']
})

export class MasterSectionListComponent implements OnInit, OnDestroy {

  displayedColumns = ['name'];
  menuDataSession = ['2019-2020', '2020-2021', '2021-2022'];
  selectedSession = this.menuDataSession[0]
  sections: any;
  constructor(
    private commonService: CommonService,
    private sectionActionService: SectionActionService,
    private uiService: UiService,
    private dialogService : DialogService
  ) { }
  ngOnDestroy(): void {
    this.uiService.loader.hide();
  }


  ngOnInit() {
    this.getFeeCategoryList();
  }

  getFeeCategoryList() {
    this.uiService.loader.show("Fetching section...");
    this.commonService[API_SERVICE_METHODS.getSections]().subscribe((result) => {
      this.sections = result['data'] || null;
      this.uiService.loader.hide();
    }, (error) => {
      this.uiService.loader.hide();
    })
  }


  actionTriggerhandler(event : { action :Action,data : any }){
    let { action , data } = event;
    this.menuClickHandler(action,data);
  }

  manageFeeCategory() {
    this.dialogService.manageSection().subscribe(()=>{this.refresh()});
  }
  refresh() {
    this.getFeeCategoryList()
  }
 
  menuClickHandler(action, data) {
    console.log("data", action, data)
    this.sectionActionService.actionTriggered(action, data).subscribe(()=>{
      this.refresh();
    })
  }
}

