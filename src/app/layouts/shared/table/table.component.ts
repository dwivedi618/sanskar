import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HELPER } from 'src/app/utils/helpers';
import { ActionMenus } from '../uiComponents/menu-button/action-menus';
import { Action } from '../uiComponents/menu-button/actions.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit,OnInit{
  isLoading : boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  ngAfterViewInit(): void {
  }
  Action =  Action;
  dataSource: MatTableDataSource<[]>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: any[];
  // columns = [];

  @Input() set data(data: any[]) {
    this.setTabelDataSource(data || []);
  }
  
  @Input() columns = [] as string[];
  @Input() actions;
  @Output() actionTriggerd = new EventEmitter<{ action, data }>();

  setTabelDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    console.log("data changed",data)
    
    this.setDisplayedColumns(this.columns)
  }

  setDisplayedColumns(data){
    console.log("column changed",data)

    if (data && data.length) {
      this.columns = data;
      this.displayedColumns = []
       this.displayedColumns = this.actions && this.actions?.length? ['select', ...this.columns,'action'] : ['select', ...this.columns]
    }
    console.log("this.columns", this.columns)
  }

  menuClickHandler(action: Action, data) {
    this.actionTriggerd.emit({ action, data });
  }

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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(){}
}
