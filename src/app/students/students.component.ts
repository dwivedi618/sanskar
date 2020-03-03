import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { CommonService } from '../services/common.service';

export interface PeriodicElement {
  fatherName: string;
  studentName: string;
  standard: string;
  address: string;
}

<<<<<<< HEAD
const ELEMENT_DATA: PeriodicElement[] = [
  {studentName: 'Manoj Dwivedi', fatherName: 'vyash', standard: '10th', address: 'Bankatiya Dubey'},
=======
// const ELEMENT_DATA: PeriodicElement[] = [
//   {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
>>>>>>> bd9253f6ca3e744b0a259d876816fa57ad04bf5c
 
//   {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
//   {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
//   {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
//   {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
//   {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
//   {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
//   {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
//   {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},
 
//   {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
//   {studentName: 'shivendra', fatherName: 'Manoj Dwivedi', standard: '10th', address: 'Bankatiya Dubey'},

//   {studentName: 'Darshan Pandey', fatherName: 'Shashichadra Pandey', standard: '3rd', address: 'Bankata'},
// ];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[];
  
  constructor(
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.commonService.getData()
      .subscribe((result) => {
        let students = result.students;
        let temp : any[];
        for (let i = 0; i < students.length ; i++){
          temp.push({
            fatherName: "Manoj kumar dwivedi",
            studentName: students[i].firstName + students[i].middleName + students[i].lastName,
            standard: students[i].standard,
            address: "Bankatiya"
          });
        }
        
        
        console.log("INSIDE stuident resssuullt",temp);

      },(error) => {
        console.log("INSIDE stuident eerroor",error);
      })
  }

  displayedColumns: string[] = ['select', 'studentName', 'fatherName', 'standard', 'address'];
<<<<<<< HEAD
  filterColumns: string[] = ['studentName', 'fatherName', 'standard', 'address'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
=======
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
>>>>>>> bd9253f6ca3e744b0a259d876816fa57ad04bf5c
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
  // public doFilter = (value: string) => {
  //     this.dataSource.filter = value.trim().toLocaleLowerCase();
  //   }
    applyFilter(filterValue: string) {
      console.log(filterValue);
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    // sorting
    // @ViewChild(MatSort,true) sort: MatSort;
    // @ViewChild(MatPaginator,true) paginator: MatPaginator;
    
  // ngAfterViewInit(): void {
   
  // }
<<<<<<< HEAD
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

=======
  
>>>>>>> bd9253f6ca3e744b0a259d876816fa57ad04bf5c
  
  

}
