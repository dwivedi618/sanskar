import { DOCUMENT } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, Inject,ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { CommonService } from '../../services/common.service';


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
  elem:any;
  show_fullscreen = true;
  close_fullscreen = false;
  isLoading = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.elem = document.documentElement;
    this.isLoading = true;
    this.commonService.getData()
      .subscribe((result) => {
        this.students = result.students;
        let temp : any[];
        this.isLoading= false;
        for (let i = 0; i < this.students.length ; i++){
          // temp.push({
          //   fatherName: "Manoj kumar dwivedi",
          //   firstName: students[i].firstName + students[i].middleName + students[i].lastName,
          //   standard: students[i].standard,
          //   address: "Bankatiya"
          // });
        }
        
        
        console.log("INSIDE stuident resssuullt",this.students);

      },(error) => {
        console.log("INSIDE stuident eerroor",error);
      })
  }

  displayedColumns: string[] = ['select', 'firstName', 'fatherName', 'standard', 'address'];
  dataSource = new MatTableDataSource<Student>(this.students);
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
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName + 1}`;
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
  
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
      this.show_fullscreen = false;
      this.close_fullscreen = true;
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
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