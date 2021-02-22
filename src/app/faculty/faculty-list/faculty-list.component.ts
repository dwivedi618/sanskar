import { AddFacultyComponent } from './../add-faculty/add-faculty.component';
import { MatDialog } from '@angular/material/dialog';
import { ExpandInOutAnimation } from './../../services/animation/dropdown-animation';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { param } from 'jquery';

export interface FacultyListItem {
  name: string;
  id: number;
  thumbnail:any;
  role:any;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: FacultyListItem[] = [
  {
    id: 1,
    name: 'Thor',
    thumbnail: '../../../../assets/user_profiles/thor.jpeg',
    role: 'science teacher'
  },
  
 {
    id: 2,
    name: 'Kungfu panda',
    thumbnail: '../../../../assets/user_profiles/profile1.jpeg',
    role: 'Not assigned'

  },  {
    id: 3,
    name: 'Stark tony ',
    thumbnail: '../../../../assets/user_profiles/profile2.jpg',
    role: 'Not assigned'

  },  {
    id: 4,
    name: 'Thor',
    thumbnail: '../../../../assets/user_profiles/thor.jpeg',
    role: 'Manager'

  },  {
    id: 5,
    name: 'Marvel in universe',
    thumbnail: '../../../../assets/user_profiles/thor.jpeg',
    role: 'admin'

  },  

];

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css'],
  animations : [ ExpandInOutAnimation]
})
export class FacultyListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FacultyListItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select','name','action'];
  selection = new SelectionModel<FacultyListItem>(true, []);

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
  checkboxLabel(row?: FacultyListItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  constructor(
    private dialog : MatDialog,
    private router : Router
  ){}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    console.log("selection",this.selection.selected)
    this.getFacultyList();
  }

  getFacultyList(){
    this.dataSource.data = EXAMPLE_DATA;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue",filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  expandAnimation ='collapsed' ;

  toggleAnimation(divName: string) {
    if (divName === 'divA') {
      this.expandAnimation = this.expandAnimation === 'expanded' ? 'collapsed' : 'expanded';
      console.log(this.expandAnimation);
    }
  }

  openDialog(){
    const  data = {}
    const dialogRef = this.dialog.open(AddFacultyComponent,{
      width : '50rem',
      maxWidth : '100vw',
      minHeight : '40rem',
      maxHeight : '100vh',
      hasBackdrop : false,
      data : data
    })
  }

  /**
   * route to add faculty page
   */
  newFaculty(){
    this.router.navigate(['faculty/add-faculty']);
  }

  /**
   * route to add faculty profile page
   * @param faculty id,name,email
   */
  openFacultyProfile(profile){
    this.router.navigate(['faculty/profile']);
  }
}