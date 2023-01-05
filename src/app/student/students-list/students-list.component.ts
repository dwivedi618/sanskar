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
import { StudentApiService } from '../services/student-api.service';
import { StudentActionService } from '../services/student-action.service';
import { UiService } from 'src/app/services/ui.service';


export interface Student {
  _id: number;
  firstName: string;
  fatherName: string;
  standard: string;
  address: string;
  thumbnail: any;
}


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select', 'name', 'age', 'gender', 'standard', 'action'];
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
    console.log("selection", this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }



  adjustScreen: any;
  show_fullscreen = true;
  close_fullscreen = false;
  isLoading = false;
  displayNoRecords: boolean;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private studentApiService: StudentApiService,
    private studentActionService: StudentActionService,
    private uiService: UiService
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
    this.uiService.loader.show("Fetching student...")
    this.studentApiService.fetch().subscribe((result) => {
      const standardList = result['data'] || null;
      this.dataSource.data = standardList
      this.uiService.loader.hide();
    }, (error) => {
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
  openStudentProfile(profile) {
    this.router.navigate(['student/profile'], { queryParams: { id: profile._id } });
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

  newAdmission() {
    this.router.navigate(['/admission']);
  }

  getThumbnail(blob) {
    if (blob != null) {
      console.log("getThumbnail", blob);
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log(base64data);
        // return base64data;
      }
    }
  }
  menuClickHandler(action,data){
    console.log("data",action , data)
    this.studentActionService.actionTriggered(action,data).subscribe(()=>{
      this.refresh();
    })
  }
 
}