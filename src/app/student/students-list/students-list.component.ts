import { DOCUMENT } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CommonService } from '../../services/common.service';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


export interface Student {
  id : number;
  firstName: string;
  fatherName: string;
  standard: string;
  address: string;
  thumbnail : any;
}

const EXAMPLE_STUDENT: Student [] = [
  {
    id :1,
    firstName: 'John',
    fatherName: 'Doe',
    standard: '12',
    address: 'D4 ,32street 9/2b',
    thumbnail: '../../../../assets/user_profiles/profile2.jpg',

  },
  {
    id :2,
    firstName: 'Monty',
    fatherName: 'duobwa',
    standard: '12',
    address: 'D4 ,32street 9/2b',
    thumbnail: '../../../../assets/user_profiles/profile2.jpg',

  }
]
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select','firstName', 'fatherName', 'standard', 'action'];
  dataSource = new MatTableDataSource<Student>();
  selection = new SelectionModel<Student>(true, []);

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
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }



  adjustScreen: any;
  show_fullscreen = true;
  close_fullscreen = false;
  isLoading = false;
  displayNoRecords: boolean;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private dialog: MatDialog,
    private router : Router,
    private commonService: CommonService
  ) { }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.adjustScreen = document.documentElement;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getStudents();
  }
  refresh() {
    this.getStudents();
  }
  getStudents() {
    this.dataSource.data = EXAMPLE_STUDENT;
    this.isLoading = true;
    const formData = []
    this.commonService.masterFeeStructure(formData)
      .subscribe((result) => {
        const studentList = result.students;
        this.dataSource.data = studentList;
        this.isLoading = false;
        console.log("service student", this.dataSource.data);
      }, (error) => {
        console.log("error", error);
      })
  }
  openFeeSubmition(obj) {
    obj.action = 'submitFee';
    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '50vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { obj }
    })

  }
  openStudentProfile(obj) {
    obj.action = 'profile';
    const dialogRef = this.dialog.open(StudentProfileComponent, {
      width: '100vw',
      maxWidth: '100%',
      height: '100vh',
      maxHeight: '100vh',
      data: { obj }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue", filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.filteredData.length == 0) {
      console.log("No matching records found")
      this.displayNoRecords = true;
    } else this.displayNoRecords = false;
  }

  newAdmission(){
    this.router.navigate(['/admission']);
  }
}