import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainMenu } from 'src/app/layouts/layout/left-sidebar-menu/sidebar.menus';
import { studentActionMenus } from 'src/app/layouts/shared/uiComponents/menu-button/action-menus';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { CommonService } from 'src/app/services/common.service';
import { RoutingService } from 'src/app/services/routing.service';
import { LABELS } from 'src/app/utils/keyparser';
import { FeeDepositComponent } from '../../fee-deposit/fee-deposit.component';
import { ParentActionService } from '../../services/parent/parent-action.service';
import { StudentActionService } from '../../services/student/student-action.service';
import { StudentApiService } from '../../services/student/student-api.service';
import { Address } from '../../student.interface';
import { TransactionComponent } from '../transaction/transaction.component';

export type DisplayFields = {label : string,type : string}[]


@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: ['./student-overview.component.scss']
})
export class StudentOverviewComponent implements OnInit {
  studentId: any;
  isLoading: boolean;
  studentData: any;
  parentData: any;
  addressData: any;
  studentFeeDetails: any;
  displayedColumns = ['name', 'frequency', 'amount', 'action'];
  displayStudentFields:DisplayFields = [
    { label : "name",type : "string"},
    { label : "academicSession",type : "string"},
    { label : "bloodGroup",type : "string"},
    { label : "conveniance",type : "string"},
    { label : "dateOfBirth",type : "date"},
    { label : "admissionInClass",type : "string"},

    { label : "gender",type : "string"},
    { label : "healthStatus",type : "string"},
    { label : "nationality",type : "string"},
    { label : "place",type : "string"},
    { label : "studentMobile",type : "phone"},
  ]
  
  displayParentFields:DisplayFields = [
    { label : "father",type : "string"},
    { label : "mother",type : "string"},
    { label : "fathersOccupation",type : "string"},
    { label : "mothersOccupation",type : "string"},
    { label : "gaurdian",type : "string"},
    { label : "contact",type : "phone"},
   
  ]

  readonly LABELS = LABELS;
  readonly Action = Action;

  appliedFee: any;
  totalFeeDeposit: any;
  find: any;
  selectedIndex: any;
  menus: MainMenu[];
  showStudentForm: any;
  isStudentFormVisible: any;
  $studentData : Observable<any>;
  $parentData :  Observable<any>;
  address: Address;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private commonService: CommonService,
    public studentApiService: StudentApiService,
    public studentActionService : StudentActionService,
    public routingService : RoutingService,
    private parentActionService : ParentActionService

  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data && data.id) {
        this.studentId = data.id;
        this.fetchStudentCompleteProfileByStudentId();
        if (data.find) {
          this.selectedIndex = data.find
        }
      }
    })
  }

  ngOnInit() {
    this.commonService[API_SERVICE_METHODS.getStudentMenuTab]().subscribe((data: MainMenu[]) => { 
      this.menus = data ;
    });
    this.fetchStudentCompleteProfileByStudentId();
    this.$studentData = this.studentApiService.studentData;
    this.$parentData = this.studentApiService.parentData;

  }

  isIncluded(fields ,key:String){
    return fields.some(field => field.label === key);
    // studentApiService.studentData | async  | keyvalue
  }
  fieldType(fields ,key:String):string{
    let field = fields.find(field => field.label === key) || { type : "" };
    return field.type;
  }


  fetchStudentCompleteProfileByStudentId() {
    this.studentApiService.fetchStudentCompleteProfileByStudentId(this.studentId)
      .subscribe((result) => {
        console.log(result);
        let [student , parent , address ] = result;
        this.parentData = parent;
        this.studentData = student || null;
        this.address = address || null;
        this.studentApiService.setStudentData(this.studentData);
        this.studentApiService.setParentData(this.parentData);
        this.studentApiService.setAddress(this.address);
        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }
  
  public name(): string {
    const { firstName = '', middleName = '', lastName = '' } = this.studentData || {};
    return `${firstName} ${middleName} ${lastName}`
  }


 

  getTotalCost() {
    return this.appliedFee.map(t => t.amount).reduce((acc, value) => acc + value, 0)
  }

  updateProfile() {
    this.router.navigate(['/admission'], { queryParams: { id: this.studentId, action: 'update' } })
  }

  printProfile() {
    console.log("print profile")
    this.router.navigate(['./student/print'], { queryParams: { id: this.studentId, action: 'print' } })
  }

  onMainTabChange(selectedTab:MainMenu){
    this.selectedIndex = selectedTab.id;
    this.router.navigate([], { queryParams: { find: this.selectedIndex }, queryParamsHandling: 'merge' });
  }
 


 
  triggerAction(action:Action,actionOn:string){
    if(action === Action.NAVIGATE){
      if(actionOn === 'student'){
        this.router.navigate(['student/overview/update'],{queryParams : { studentId : this.studentId },  queryParamsHandling : 'merge'})
      }
      if(actionOn === 'parent'){
        this.router.navigate(['student/overview/update/parent'],{queryParams : { studentId : this.studentId , action : Action.UPDATE },  queryParamsHandling : 'merge'})
      }
    }

    this.menuClickHandler(action,this.studentData);
  }
  triggerParentAction(action:Action){
    this.menuClickHandlerParent(action,this.parentData);
  }

  menuClickHandler(action, data) {
    console.log("data", action, data)
    this.studentActionService.actionTriggered(action, data).subscribe(()=>{
      this.refresh();
    })
  }

  menuClickHandlerParent(action, data) {
    console.log("data", action, data)
    this.parentActionService.actionTriggered(action, data).subscribe(()=>{
      this.refresh();
    })
  }

  
  refresh(){
    this.fetchStudentCompleteProfileByStudentId();
  }
 

}
