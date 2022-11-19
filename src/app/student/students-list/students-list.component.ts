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


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select','name', 'standard', 'action'];
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
    console.log("dataSource", this.dataSource.data);

    // this.dataSource.data = EXAMPLE_STUDENT;
    this.isLoading = true;
    
    this.commonService.getStudentRecord()
      .subscribe((result) => {
        console.log("all student", result);
        this.dataSource.data = result.data || null;
        console.log("dataSource", this.dataSource.data);

        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
        console.log("dataSource", this.dataSource.data);

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
  /**
   * route to add student profile page
   * @param profile id,name,email
   */
  openStudentProfile(profile){
    this.router.navigate(['student/profile'] ,{queryParams : {id : profile.id}});
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

  getThumbnail(blob){
    if(blob != null){
      console.log("getThumbnail",blob);
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        var base64data = reader.result;                
        console.log(base64data);
        // return base64data;
    }
  }
  }
}