import {  Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UiService } from 'src/app/services/ui.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { SectionActionService } from '../services/section-action.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionApiService } from '../services/section-api.service';
import { ClassApiService } from '../../services/class-api.service';
import { ActionMenus } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';

@Component({
  selector: 'app-master-section-list',
  templateUrl: './master-section-list.component.html',
  styleUrls: ['./master-section-list.component.scss']
})

export class MasterSectionListComponent implements OnInit, OnDestroy {

  displayedColumns = ['name','maxStrength',"hallName"];
  menuDataSession = ['2019-2020', '2020-2021', '2021-2022'];
  selectedSession = this.menuDataSession[0]
  sections: any;
  standardId: any;
  selectedStandardName: any;
  standardList: any;
  actions = ActionMenus
  constructor(
    private commonService: CommonService,
    private sectionActionService: SectionActionService,
    private sectionApiService: SectionApiService,
    private uiService: UiService,
    private dialogService : DialogService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private classApiService : ClassApiService
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
    this.getMasterStandardList();
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

  manageSection() {
    this.dialogService.manageSection({standardId : this.standardId}).subscribe(()=>{this.refresh()});
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

  onStandardChange(data) {
    
    this.standardId = data._id
    this.selectedStandardName = data.name
    this.router.navigate([], { queryParams: { year: this.selectedSession, standardId: this.standardId, n: this.selectedStandardName }, queryParamsHandling: 'merge' })
    this.getSectionList();
  }
  
  getMasterStandardList() {
    this.classApiService.fetch().subscribe((result) => {
      this.standardList = result['data'] || [];
    }, (error) => {
    })
  }
}

