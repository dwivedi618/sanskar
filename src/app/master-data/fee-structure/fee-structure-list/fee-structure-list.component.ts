import { AlertService } from 'src/app/services/alert.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { HELPER as HELPER } from 'src/app/utils/helpers';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { ClassActionService } from '../../standard/services/class-action.service';
import { ClassApiService } from '../../standard/services/class-api.service';



@Component({
  selector: 'app-fee-structure-list',
  templateUrl: './fee-structure-list.component.html',
  styleUrls: ['./fee-structure-list.component.scss']
})

export class FeeStructureListComponent implements AfterViewInit, OnInit {
  @ViewChild('selectStandardbtn' ,{static : false}) selectStandardbtn : HTMLElement
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'frequency','optional','amount','action'];
  selection = new SelectionModel<any>(true, []);
  standardList: any;
  selectedStandard: string;
  standatdId: any;
  standardId: any;
  selectedStandardName: any;
  fees: any;

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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  sessionLists = [
  { value : '2020-2021', viewValue : '2020-2021'},
  { value : '2021-2022', viewValue : '2021-2022'}
  ]

  selectedSession : string
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService : AlertService,
    private commonService: CommonService,
    private classActionService : ClassActionService,
    private classApiService : ClassApiService
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        this.selectedSession = data.year
        if(data.standardId){
          this.standardId = data.standardId
          console.log("this.standardId",this.standardId);
          
          this.getFeeStructureList()
        }
        if(data.n){
          this.selectedStandardName = data.n
        }
      }
        
    })
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    console.log("selection", this.selection.selected)
    this.getMasterStandardList();
    this.getFeeStructureList();
    this.getFeeCategoryList();
  }

  getFeeStructureList() {
    this.commonService.getClassFeeById(this.selectedSession, this.standardId).subscribe((result) => {
      console.log("this.standardId", this.standardId);
      console.log("Fee Structure result", result);
      const structureList = result['data'] || null;
      if(HELPER.isObject(structureList)){
        this.dataSource.data = structureList?.fees || [];
      }
      if(HELPER.isArray(structureList)){
        let allClasses = structureList ;
        const defaultSelectedClass = allClasses.filter(classObj=>classObj._id === this.standardId)[0];
        this.dataSource.data = defaultSelectedClass?.fees  || [];
        console.log("defaultSelectedClass",defaultSelectedClass);
        
      }
      
    }, (error) => {
      console.log(" error", error);
    })

   
  }
  /**
   * 
   * @param data selectedStadard
   */
  onSessionChange(data) {
    this.selectedSession = data.value
    this.router.navigate([], { queryParams: { year: this.selectedSession, standardId: this.standardId ,n : this.selectedStandardName}, queryParamsHandling: 'merge' })
    if(this.selectedStandardName && this.standardId){
      this.getFeeStructureList();
    }else{
      this.alertService.alertWithAction("Do not forget to select standard/class",'select standard').subscribe(action =>{
        console.log("action----->",action)
        let selectStandardbtn : HTMLElement = document.getElementById('selectStandardbtn') as HTMLElement
        selectStandardbtn.click()
      })
    }
  }
  /**
   * 
   * @param data selectedStadard
   */
  onStandardChange(data) {
    this.standardId = data._id
    this.selectedStandardName = data.name
    this.router.navigate([], { queryParams: { year: this.selectedSession, standardId: this.standardId ,n : this.selectedStandardName}, queryParamsHandling: 'merge' })
    this.getFeeStructureList();
  }



  getMasterStandardList() {
    this.classApiService.fetch().subscribe((result) => {
      console.log("classes", result);
      this.standardList = result['data'] || [];
    }, (error) => {
      console.log("error", error);
    })
  }

  getFeeCategoryList(){
    console.log("getMasterFeeCategory result");

    this.commonService[API_SERVICE_METHODS.getFees]().subscribe((result)=>{
      console.log("getMasterFeeCategory result",result);
      this.fees = result['data'] || null;
    },(error)=>{
      console.log("getMasterFeeCategory error",error);
    }) 
}

  getSelectedStandard(standardId) {
    let standardName = 'Select'
      this.standardList.forEach(list => {
        if (list.id == standardId) { 
          standardName = list.name
          return standardName
        } 
      }) 
      return standardName
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    
      
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("filterValue", filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /** Gets the total cost of all transactions. */
   getTotalCost() {
    return this.dataSource.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  expandAnimation = 'collapsed';

  toggleAnimation(divName: string) {
    if (divName === 'divA') {
      this.expandAnimation = this.expandAnimation === 'expanded' ? 'collapsed' : 'expanded';
      console.log(this.expandAnimation);
    }
  }


  /**
   * route to add new FeeStructure page where admin can define fee for any courses/classes/standards
   */
  newFeeStructure() {
    this.router.navigate(['master/fee-structure/', 'new']);
  }




  /**
   * route to fee category , where user can add fee category
   */
  newFeeCategory() {
    this.router.navigate(['fee-structure/master-fee-category', 'new'])
  }

  menuClickHandler(action,data){
    console.log("data",action , data)
    this.classActionService.actionTriggered(action,data).subscribe(()=>{
      this.refresh();
    })
  }
  refresh() {
    this.getMasterStandardList()
  }
}

