

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AcademicYearActionService } from '../services/academic-year-action.service';
import { UiService } from 'src/app/services/ui.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { ActionMenus } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';

@Component({
  selector: 'app-academic-year-list',
  templateUrl: './academic-year-list.component.html',
  styleUrls: ['./academic-year-list.component.scss']
})

export class AcademicYearListComponent implements OnInit, OnDestroy {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name'];
  academicYearList: any;
  actions = ActionMenus;
  constructor(
    private commonService: CommonService,
    private academicYearActionService: AcademicYearActionService,
    private uiService: UiService,
    private dialogService: DialogService
  ) { }

  ngOnDestroy(): void {
    this.uiService.loader.hide();
  }
  ngOnInit() {
    this.getFeeCategoryList();
  }

  getFeeCategoryList() {
    this.uiService.loader.show("Fetching academicYearList...");
    this.commonService[API_SERVICE_METHODS.getAcademicYearList]().subscribe((result) => {
      this.academicYearList = result['data'] || null;
      this.uiService.loader.hide();
    }, (error) => {
      console.log("getMasterFeeCategory error", error);
      this.uiService.loader.hide();
    })
  }

  actionTriggerhandler(event: { action: Action, data: any }) {
    let { action, data } = event;
    this.menuClickHandler(action, data);
  }

  manageAcademicYear() {
    this.dialogService.manageAcademicYear().subscribe(() => { this.refresh() });
  }
  refresh() {
    this.getFeeCategoryList()
  }
  menuClickHandler(action, data) {
    console.log("data", action, data)
    this.academicYearActionService.actionTriggered(action, data).subscribe(() => {
      this.refresh();
    })
  }
}

