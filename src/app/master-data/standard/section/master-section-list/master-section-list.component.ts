import {  Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UiService } from 'src/app/services/ui.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { SectionActionService } from '../services/section-action.service';
import { ActivatedRoute } from '@angular/router';
import { SectionApiService } from '../services/section-api.service';

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
  standardId: any;
  selectedStandardName: any;
  constructor(
    private commonService: CommonService,
    private sectionActionService: SectionActionService,
    private sectionApiService: SectionApiService,
    private uiService: UiService,
    private dialogService : DialogService,
    private activatedRoute : ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        this.selectedSession = data.year
        if (data.standardId) {
          this.standardId = data.standardId
          this.getSectionList()
        }
        if (data.n) {
          this.selectedStandardName = data.n
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.uiService.loader.hide();
  }


  ngOnInit() {
    this.getSectionList();
  }

  getSectionList() {
    this.uiService.loader.show("Fetching section...");
    this.sectionApiService.getById(this.standardId).subscribe((result) => {
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
    this.getSectionList()
  }
 
  menuClickHandler(action, data) {
    console.log("data", action, data)
    this.sectionActionService.actionTriggered(action, data).subscribe(()=>{
      this.refresh();
    })
  }
}

