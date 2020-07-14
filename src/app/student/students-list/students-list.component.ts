import { DOCUMENT } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, Inject,ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { CommonService } from '../../services/common.service';
import { FeesComponent } from 'src/app/fees/fees.component';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { TransactionComponent } from '../transaction/transaction.component';


export interface Student {
  firstName: string;
  fatherName: string;
  standard: string;
  address: string;
}
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {








  students: Student[];
  adjustScreen:any;
  show_fullscreen = true;
  close_fullscreen = false;
  isLoading = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private dialog : MatDialog,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.adjustScreen = document.documentElement;
    this.getStudents();
  }
getStudents(){
  this.isLoading = true;
  this.commonService.getData()
    .subscribe((result) => {
      this.students = result.students;
      let temp : any[];
      this.isLoading= false;
      console.log("service student",this.students);
    },(error) => {
      console.log("error",error);
    })
}
openFeeSubmition(obj){
obj.action = 'submitFee';
   const dialogRef = this.dialog.open(TransactionComponent,{
     width:'50vw',
     maxWidth: '100%',
     data : {obj}
   })

}
openStudentProfile(obj){
  obj.action = 'profile';
     const dialogRef = this.dialog.open(StudentProfileComponent,{
       width:'100vw',
       maxWidth: '100%',
       height:'100vh',
       maxHeight:'100vh',
       data : {obj}
     })
  
  }
  displayedColumns: string[] = ['select', 'firstName', 'fatherName', 'standard', 'address'];
  dataSource = new MatTableDataSource<Student>(this.students);
  selection = new SelectionModel<Student>(true, []);

  /** Whether the number of selected adjustScreenents matches the total number of rows. */
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
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName + 1}`;
  }

  // filtering

  
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

  openFullscreen() {
    if (this.adjustScreen.requestFullscreen) {
      this.adjustScreen.requestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.adjustScreen.mozRequestFullScreen) {
      /* Firefox */
      this.adjustScreen.mozRequestFullScreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.adjustScreen.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.adjustScreen.webkitRequestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.adjustScreen.msRequestFullscreen) {
      /* IE/Edge */
      this.adjustScreen.msRequestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
      this.show_fullscreen = true;
      this.close_fullscreen = false;
    }
  }
}