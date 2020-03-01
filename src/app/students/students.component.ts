import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

export interface PeriodicElement {
  fatherName: string;
  studentName: string;
  standard: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
  {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
  {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
  {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
  {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
  {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
  {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
  {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
  {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
  {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
  {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
  {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
 
  displayedColumns: string[] = ['select', 'studentName', 'fatherName', 'standard', 'address'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.studentName + 1}`;
  }

  // filtering

  3
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    // sorting
    // @ViewChild(MatSort,true) sort: MatSort;
    // @ViewChild(MatPaginator,true) paginator: MatPaginator;
    
  constructor() {}
  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }
  ngOnInit() {

  }

  
  

}
