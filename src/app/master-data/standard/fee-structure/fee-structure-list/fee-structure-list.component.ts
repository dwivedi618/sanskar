import { AlertService } from 'src/app/services/alert.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { HELPER as HELPER } from 'src/app/utils/helpers';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { ManageFeeStructureComponent } from '../manage-fee-structure/manage-fee-structure.component';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { ClasswiseFeesActionService } from '../services/classwise-fees-action.service';
import { ClasswiseFeesApiService } from '../services/classwise-fees-api.service';
import { Fee } from '../../section/fee.interface';
import { ClassActionService } from '../../services/class-action.service';
import { ClassApiService } from '../../services/class-api.service';
import { RoutingService } from 'src/app/services/routing.service';
import { MainMenu } from 'src/app/layouts/shared/uiComponents/left-sidebar-menu/sidebar.menus';

interface classWiseFee {
  amount: Number,
  fee: Fee
}
@Component({
  selector: 'app-fee-structure-list',
  templateUrl: './fee-structure-list.component.html',
  styleUrls: ['./fee-structure-list.component.scss']
})

export class FeeStructureListComponent implements OnInit {
  @ViewChild('selectStandardbtn', { static: false }) selectStandardbtn: HTMLElement
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'frequency', 'isOptional', 'amount'];
  standardList: any;
  selectedStandard: string;
  standardId: any;
  selectedStandardName: any;
  fees: any;
  classWiseFees: any;
  Action = Action;
  sessionLists = [
    { value: '2020-2021', viewValue: '2020-2021' },
    { value: '2021-2022', viewValue: '2021-2022' }
  ]

  selectedSession: string
  classWiseFeesOriginal: any;
  selectedIndex: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
    public classApiService: ClassApiService,
    private classwiseFeeActionService: ClasswiseFeesActionService,
    private classwiseFeesApiService: ClasswiseFeesApiService,
    public routingService : RoutingService,
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        this.selectedSession = data.year
        if (data.standardId) {
          this.standardId = data.standardId
          this.getFeeStructureList()
        }
        if (data.n) {
          this.selectedStandardName = data.n
        }
      }
    })
  }

  ngOnInit() {
    this.getMasterStandardList();
    this.getFeeStructureList();
    this.getFeeCategoryList();
  }

  getFeeStructureList() {
    if (!this.standardId) return
    this.classwiseFeesApiService.getClassFeeById(this.selectedSession, this.standardId).subscribe((result) => {
      const structureList = result['data'] || null;
      this.classWiseFeesOriginal = result['data']?.fees
      if (HELPER.isObject(structureList)) {
        let classWiseFee = structureList?.fees || [] as classWiseFee[];
        let serializeClassWiseFee = []
        classWiseFee.forEach((fees: classWiseFee) => {
          let fee = { amount: fees.amount, ...fees.fee }
          serializeClassWiseFee.push(fee);
        })
        this.classWiseFees = serializeClassWiseFee
      }
    }, (error) => {
    })


  }
  /**
   * 
   * @param data selectedStadard
   */
  onSessionChange(data) {
    this.selectedSession = data.value
    this.router.navigate([], { queryParams: { year: this.selectedSession, standardId: this.standardId, n: this.selectedStandardName }, queryParamsHandling: 'merge' })
    if (this.selectedStandardName && this.standardId) {
      this.getFeeStructureList();
    } else {
      this.alertService.alertWithAction("Do not forget to select standard/class", 'select standard').subscribe(action => {
        let selectStandardbtn: HTMLElement = document.getElementById('selectStandardbtn') as HTMLElement
        selectStandardbtn.click()
      })
    }
  }
  /**
   * 
   * @param data selectedStadard
   */
  onStandardChange(data) {
    this.standardId = data._id
    this.selectedStandardName = data.name
    this.router.navigate([], { queryParams: { year: this.selectedSession, standardId: this.standardId, n: this.selectedStandardName }, queryParamsHandling: 'merge' })
    this.getFeeStructureList();
  }



  getMasterStandardList() {
    this.classApiService.fetch().subscribe((result) => {
      this.standardList = result['data'] || [];
    }, (error) => {
    })
  }

  getFeeCategoryList() {

    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result) => {
      this.fees = result['data'] || null;
    }, (error) => {
    })
  }

  getSelectedStandard(standardId) {
    let standardName = 'Select'
    this.standardList.forEach(list => {
      if (list.id == standardId) {
        standardName = list.name
        return standardName
      }
    })
    return standardName
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.classWiseFees && this.classWiseFees.length ? this.classWiseFees.map(t => t.amount).reduce((acc, value) => acc + value, 0) : 0
  }

  clickToAction(action: Action) {
    let dialogData = {
      standardId: this.standardId || null,
      fees: this.classWiseFeesOriginal || {}
    }
    this.menuClickHandler(action, dialogData);
  }

  menuClickHandler(action: Action, data) {
    this.classwiseFeeActionService.actionTriggered(action, data).subscribe(() => {
      this.refresh();
    })
  }
  refresh() {
    this.getFeeStructureList();
  }
  actionTriggerhandler(event) {
    this.clickToAction(Action.UPDATE)
  }
  onMainTabChange(selectedTab:MainMenu){
    this.selectedIndex = selectedTab.id;
    this.routingService.onTriggerStudentTab(selectedTab.subMenus);
    this.router.navigate([selectedTab.path], { queryParams: { find: this.selectedIndex }, queryParamsHandling: 'merge' });
  }

  onSelect(selectionObj: { _id : String, name : String }){
    console.log("on class select",selectionObj);
    this.router.navigate([], { queryParams: { standardId: selectionObj._id, n: selectionObj.name }, queryParamsHandling: 'merge' });
  }
}

