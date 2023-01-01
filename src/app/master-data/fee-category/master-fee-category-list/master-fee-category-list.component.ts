

import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ManageFeeCategoryComponent } from '../manage-fee-category/manage-fee-category.component';
import { Fee } from '../fee.interface';
import { JsonFormService } from 'src/app/services/json-form.service';
import { FeeActionService } from '../services/fee-action.service';
import { UiService } from 'src/app/services/ui.service';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { DialogService } from 'src/app/layouts/shared/dialog.service';



@Component({
  selector: 'app-master-fee-category-list',
  templateUrl: './master-fee-category-list.component.html',
  styleUrls: ['./master-fee-category-list.component.scss']
})

export class MasterFeeCategoryListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Fee>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'frequency', 'optional', 'action'];
  selection = new SelectionModel<Fee>(true, []);

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
    console.log("selection", this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Fee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row._id + 1}`;
  }

  menuDataSession = ['2019-2020', '2020-2021', '2021-2022'];
  selectedSession = this.menuDataSession[0]
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
    this.dataSource = new MatTableDataSource();
    console.log("selection", this.selection.selected)
    this.getFeeCategoryList();
  }

  getFeeCategoryList() {
    this.uiService.loader.show("Fetching fees...");
    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result) => {
      this.dataSource.data = result['data'] || null;
      this.uiService.loader.hide();
    }, (error) => {
      console.log("getMasterFeeCategory error", error);
      this.uiService.loader.hide();
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  expandAnimation = 'collapsed';

  toggleAnimation(divName: string) {
    if (divName === 'divA') {
      this.expandAnimation = this.expandAnimation === 'expanded' ? 'collapsed' : 'expanded';
      console.log(this.expandAnimation);
    }
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

