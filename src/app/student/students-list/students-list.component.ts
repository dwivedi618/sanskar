import { DOCUMENT } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, Inject,ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { CommonService } from '../../services/common.service';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['firstName', 'fatherName', 'standard', 'action'];
  dataSource = new MatTableDataSource<Student>();
  selection = new SelectionModel<Student>(true, []);

  adjustScreen:any;
  show_fullscreen = true;
  close_fullscreen = false;
  isLoading = false;
  displayNoRecords: boolean;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private dialog : MatDialog,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.adjustScreen = document.documentElement;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getStudents();
  }
getStudents(){
  this.isLoading = true;
  this.commonService.getData()
    .subscribe((result) => {
     const studentList = result.students;
    //  if (result['data'] == null) {
    //   this.message = result;
    //   this.isStudentListEmpty = true;
    //   console.log("isProductListEmpty :", this.message);
    // }
     this.dataSource.data = studentList;
      this.isLoading= false;
      console.log("service student",this.dataSource.data);
    },(error) => {
      console.log("error",error);
    })
}
openFeeSubmition(obj){
obj.action = 'submitFee';
   const dialogRef = this.dialog.open(TransactionComponent,{
     width:'50vw',
     maxWidth: '100vw',
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
 


    applyFilter(filterValue: string) {
      console.log(filterValue);
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      if (this.dataSource.filteredData.length == 0) {
        console.log("No matching records found")
        this.displayNoRecords = true;
      }else this.displayNoRecords = false; 
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