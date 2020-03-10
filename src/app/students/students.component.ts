import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { CommonService } from '../services/common.service';

export interface Student {
  firstName: string;
  fatherName: string;
  standard: string;
  address: string;
}




@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  
  constructor(
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.commonService.getData()
      .subscribe((result) => {
        this.students = result.students;
        let temp : any[];
        
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
  
  
  

}
