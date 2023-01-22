

import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { JsonFormService } from 'src/app/services/json-form.service';
import { FeeActionService } from '../services/fee-action.service';
import { UiService } from 'src/app/services/ui.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { ActionMenus } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';

@Component({
  selector: 'app-master-fee-category-list',
  templateUrl: './master-fee-category-list.component.html',
  styleUrls: ['./master-fee-category-list.component.scss']
})

export class MasterFeeCategoryListComponent implements OnInit, OnDestroy {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'frequency', 'isOptional'];
  fees: any;
  menuDataSession = ['2019-2020', '2020-2021', '2021-2022'];
  selectedSession = this.menuDataSession[0]
  actions = ActionMenus;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private jsonFormService: JsonFormService,
    private feeActionService: FeeActionService,
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
    this.uiService.loader.show("Fetching fees...");
    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result) => {
      this.fees = result['data'] || null;
      this.uiService.loader.hide();
    }, (error) => {
      console.log("getMasterFeeCategory error", error);
      this.uiService.loader.hide();
    })
  }

  actionTriggerhandler(event : { action :Action,data : any }){
    let { action , data } = event;
    this.menuClickHandler(action,data);
  }

  manageFeeCategory() {
    this.dialogService.manageFeeCategory().subscribe(()=>{this.refresh()});
  }
  refresh() {
    this.getFeeCategoryList()
  }
 
  menuClickHandler(action, data) {
    console.log("data", action, data)
    this.feeActionService.actionTriggered(action, data).subscribe(()=>{
      this.refresh();
    })
  }
}

