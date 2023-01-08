import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MainMenu } from 'src/app/layouts/shared/uiComponents/left-sidebar-menu/sidebar.menus';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { CommonService } from 'src/app/services/common.service';
import { RoutingService } from 'src/app/services/routing.service';
import { LABELS } from 'src/app/utils/keyparser';
import { FeeDepositComponent } from '../../fee-deposit/fee-deposit.component';
import { StudentApiService } from '../../services/student-api.service';
import { TransactionComponent } from '../../transaction/transaction.component';



@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentId: any;
  isLoading: boolean;
  studentData: any;
  parentData: any;
  addressData: any;
  studentFeeDetails: any;
  displayedColumns = ['name', 'frequency', 'amount', 'action'];
  displayStudentFields = [
    "academicSession",
    "bloodGroup",
    "conveniance",
    "dateOfBirth",
    "firstName",
    "gender",
    "healthStatus",
    "lastName",
    "middleName",
    "name",
    "nationality",
    "place",
    "studentMobile"
  ]

  readonly LABELS = LABELS;

  appliedFee: any;
  totalFeeDeposit: any;
  find: any;
  selectedIndex: any;
  menus: MainMenu[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private commonService: CommonService,
    public studentApiService: StudentApiService,
    public routingService : RoutingService

  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data && data.id) {
        this.studentId = data.id;
        this.getProfile();
        this.getFeeDetails();
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
  }

  getProfile() {
    this.studentApiService.fetchById(this.studentId)
      .subscribe((result) => {
        this.studentData = result || null;
        this.studentData.name = this.name();
        this.studentApiService.setStudentData(this.studentData);
        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
  }


  public name(): string {
    const { firstName = '', middleName = '', lastName = '' } = this.studentData || {};
    return `${firstName} ${middleName} ${lastName}`
  }


  getFeeDetails() {
    this.commonService.studentFeeDetails(this.studentId)
      .subscribe((result) => {
        console.log("Student profile", result);
        let studentFeeDetails = result.data || null;
        this.appliedFee = studentFeeDetails['feeStructures']
        this.totalFeeDeposit = studentFeeDetails['totalDeposited']
        this.isLoading = false;
      }, (error) => {
        console.log("error", error);
      })
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
 
  openfeeDeposit() {
    const data = <any>{}
    data.studentId = this.studentId
    const dialogRef = this.dialog.open(FeeDepositComponent, {
      width: '40rem',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      data: data
    })

    dialogRef.afterClosed().subscribe((status: Boolean) => {
      this.getFeeDetails();
    })
  }

 

}
