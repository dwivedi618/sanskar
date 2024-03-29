import { DOCUMENT } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CommonService } from '../../services/common.service';
import { StudentOverviewComponent } from '../student-profile-layout/overview/student-overview.component';
import { TransactionComponent } from '../student-profile-layout/transaction/transaction.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentApiService } from '../services/student/student-api.service';
import { StudentActionService } from '../services/student/student-action.service';
import { UiService } from 'src/app/services/ui.service';
import { studentActionMenus } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';


export interface Student {
  _id: string;
  studentId: string;
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
  displayedColumns: string[] = ['name','dateOfBirth', 'gender', 'admissionInClass'];
  dataSource = new MatTableDataSource<Student>();
  selection = new SelectionModel<Student>(true, []);
  studentActionMenus = studentActionMenus;
  $studentsBasicInfo = this.studentApiService.$studentsBasicInfo;

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
  isLoading = true;
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
    this.studentApiService.$studentsBasicInfo.subscribe(console.log)
  }
  refresh() {
    this.getStudents();
  }

  getStudents() {
    this.uiService.loader.show("Fetching student...")
    this.studentApiService.fetchStudents().subscribe((result) => {
      const standardList = result['data'] || null;
      this.dataSource.data = standardList
      this.uiService.loader.hide();
      setTimeout(() => {
        this.isLoading = false
      }, 3000);
    }, (error) => {
    })
  }

  public name(profile): string {
    const { firstName = '', middleName = '', lastName = '' } = profile || {};
    return `${firstName} ${middleName} ${lastName}`
  }



  /**
   * route to add student profile page
   * @param profile id,name,email
   */
  openStudentProfile(profile) {
    
    this.router.navigate(['student/overview'], { queryParams: { id: profile._id , name : this.name(profile) } });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value || '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  /**
   * Description placeholder
   * @date 7/1/2023
   * @author Shivam Dwivedi
   */
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
  actionTriggerhandler(actionEvent){
    if(actionEvent.action === Action.NAVIGATE){
      let profile = actionEvent.data
      profile && profile._id && this.router.navigate(['student/overview'], { queryParams: { id: profile._id , name : this.name(profile) } });
    }
    
  }
  menuClickHandler(action,data){
    console.log("data",action , data)
    this.studentActionService.actionTriggered(action,data).subscribe(()=>{
      this.refresh();
    })
  }
 
  onSelect(selectionObj: { _id : String, name : String }){
    console.log("on class select",selectionObj);
    this.router.navigate([], { queryParams: { standardId: selectionObj._id, n: selectionObj.name }, queryParamsHandling: 'merge' });
  }
}