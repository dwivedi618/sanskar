import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

export interface PeriodicElement {
  question: string;
  subject: string;
  level: string;
  topic: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'medium', topic: 'B'},
  {subject: 'Data structure', question: 'Differentiate between file and structure storage structure.', level: 'high', topic: 'He'},
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'medium', topic: 'B'},
  {subject: 'Data structure', question: 'When is a binary search best applied?', level: 'medium', topic: 'Li'},
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'low', topic: 'B'},
  {subject: 'Data structure', question: 'How do you reference all the elements in a one-dimension array?', level: 'high', topic: 'Be'},
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'low', topic: 'B'},
  {subject: 'Data structure', question: 'Which data structures are applied when dealing with a recursive function?', level: 'high', topic: 'C'},
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'low', topic: 'B'},
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'low', topic: 'B'},
  {subject: 'Data structure', question: 'What is data structure?', level: 'low', topic: 'H'},
  {subject: 'Software engineering', question: 'What is Software Engineering?', level: 'low', topic: 'B'},
];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
 
  displayedColumns: string[] = ['select', 'subject', 'question', 'level', 'topic'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.subject + 1}`;
  }

  // filtering

  3
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    // sorting
    // @ViewChild(MatSort) sort: MatSort;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor() {}
  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }
  ngOnInit() {

  }

  
  

}
