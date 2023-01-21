

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

export class MasterStandardListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MasterStandardList>;
  dataSource = new MatTableDataSource<any>();
  classActionMenus = classActionMenus;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name'];
  selection = new SelectionModel<MasterStandardList>(true, []);
  classes = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
      }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MasterStandardList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  menuDataSession = ['2019-2020','2020-2021','2021-2022'];
  selectedSession = this.menuDataSession[0]
  constructor(
    public commonService : CommonService,
    private dialogService : DialogService,
    private loaderService : UiService,
    private classActionService : ClassActionService,
    private classApiService : ClassApiService,
    private router : Router
  ){}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getMasterStandardList();
  }

  getMasterStandardList(){
      this.loaderService.loader.show("Fetching classes...")
      this.classApiService.fetch().subscribe((result)=>{
        const standardList = result['data'] || null;
        this.classes = result['data'] || null;
        this.dataSource.data = standardList
        this.loaderService.loader.hide();
      },(error)=>{
      })
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  expandAnimation ='collapsed' ;




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

