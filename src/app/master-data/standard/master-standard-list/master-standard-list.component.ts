

import { MatDialog } from '@angular/material/dialog';
import { ExpandInOutAnimation } from '../../../services/animation/dropdown-animation';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ManageMasterStandardComponent } from '../manage-master-standard/manage-master-standard.component';
import { CommonService } from 'src/app/services/common.service';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { UiService } from 'src/app/services/ui.service';
import { ClassActionService } from '../services/class-action.service';
import { ClassApiService } from '../services/class-api.service';
import { Class } from '../class.interface';
import { classActionMenus } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';


export interface MasterStandardList {
  name: string;
  id: number;
  thumbnail:any;
  role:any;
}



@Component({
  selector: 'app-master-standard-list',
  templateUrl: './master-standard-list.component.html',
  styleUrls: ['./master-standard-list.component.scss']
})

export class MasterStandardListComponent implements OnInit {

  classActionMenus = classActionMenus;
  displayedColumns = ['name'];
  classes = [];
  constructor(
    public commonService : CommonService,
    private dialogService : DialogService,
    private loaderService : UiService,
    private classActionService : ClassActionService,
    private classApiService : ClassApiService,
    private router : Router
  ){}

  ngOnInit() {
    this.getMasterStandardList();
  }

  getMasterStandardList(){
      this.loaderService.loader.show("Fetching classes...")
      this.classApiService.fetch().subscribe((result)=>{
        const standardList = result['data'] || null;
        this.classes = result['data'] || null;
        this.loaderService.loader.hide();
      },(error)=>{
      })
  }





  manageMasterStandard(){
    this.dialogService.manageMasterStandard().subscribe(result=>{
      this.getMasterStandardList();
    })
  }

  actionTriggerhandler(event : { action :Action,data : any }){
    let { action , data } = event;
    this.menuClickHandler(action,data);
  }
  menuClickHandler(action,data){
    console.log("action",action)
    this.classActionService.actionTriggered(action,data).subscribe(()=>{
      this.refresh();
    })
  }
  refresh() {
    this.getMasterStandardList()
  }

  classRowClickHandler(selectedClass:Class){
    this.menuClickHandler(Action.NAVIGATE,selectedClass);
  }
 

}

