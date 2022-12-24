

import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { param } from 'jquery';
import { CommonService } from 'src/app/services/common.service';
import { ManageFeeCategoryComponent } from '../manage-fee-category/manage-fee-category.component';
import { Fee } from '../fee.interface';
import { JsonFormService } from 'src/app/services/json-form.service';
import { FeeFrequencyPipe } from 'src/app/layouts/shared/customPipes/fee-frequency.pipe';
import { FeeActionService } from '../services/fee-action.service';



@Component({
  selector: 'app-master-fee-category-list',
  templateUrl: './master-fee-category-list.component.html',
  styleUrls: ['./master-fee-category-list.component.scss']
})

export class MasterFeeCategoryListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Fee>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','name','frequency','optional','action'];
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
        console.log("selection",this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Fee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row._id + 1}`;
  }

  menuDataSession = ['2019-2020','2020-2021','2021-2022'];
  selectedSession = this.menuDataSession[0]
  constructor(
    private dialog : MatDialog,
    private router : Router,
    private commonService : CommonService,
    private jsonFormService : JsonFormService,
    private feeActionService : FeeActionService
  ){}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    console.log("selection",this.selection.selected)
    this.getFeeCategoryList();
    this.jsonFormService.getFeeFormJson().subscribe(data => console.log("data",data))
  }

  getFeeCategoryList(){
      this.commonService.getMasterFee().subscribe((result)=>{
        console.log("getMasterFeeCategory result",result);
        this.dataSource.data = result['data'] || null;
      },(error)=>{
        console.log("getMasterFeeCategory error",error);
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

  expandAnimation ='collapsed' ;

  toggleAnimation(divName: string) {
    if (divName === 'divA') {
      this.expandAnimation = this.expandAnimation === 'expanded' ? 'collapsed' : 'expanded';
      console.log(this.expandAnimation);
    }
  }


  /**
   * route to add new FeeStructure page where admin can define fee for any courses/classes/standards
   */
  newFeeStructure(){
    this.router.navigate(['fee-structure/' ,'new' ]);
  }
  /**
   * route to fee category , where user can add fee category
   */
  newFeeCategory(){
    this.router.navigate(['fee-structure/fee-category','new'])
  }
  manageFeeCategory(){
    const data = {}
    const dialogRef = this.dialog.open(ManageFeeCategoryComponent,{
      width : '40rem',
      maxWidth : '100vw',
      
      maxHeight : '100vh',
      hasBackdrop : false,
      // panelClass : 'dialog-container-pt-0',
      data : data
    })
    dialogRef.afterClosed().subscribe({next:()=>this.getFeeCategoryList()})
  }
  refresh(){
    this.getFeeCategoryList()
  }
  /**
   * route to add faculty profile page
   * @param faculty id,name,email
   */
  openFacultyProfile(profile){
    this.router.navigate(['faculty/profile']);
  }

  menuClickHandler(action,data){
    console.log("data",action , data)
    this.feeActionService.actionTriggered(action,data);
  }
}

