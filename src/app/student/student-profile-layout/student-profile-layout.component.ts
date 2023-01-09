import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainMenu } from 'src/app/layouts/shared/uiComponents/left-sidebar-menu/sidebar.menus';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { CommonService } from 'src/app/services/common.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-student-profile-layout',
  templateUrl: './student-profile-layout.component.html',
  styleUrls: ['./student-profile-layout.component.scss']
})
export class StudentProfileLayoutComponent implements OnInit {
  studentId: any;
  selectedIndex: any;
  menus: MainMenu[];
  name: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public routingService : RoutingService,
    private router: Router,
  ) { 
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data && data.id) {
        this.studentId = data.id;
        this.name = data.name;
        // this.getProfile();
        // this.getFeeDetails();
        if (data.find) {
          this.selectedIndex = data.find
        }
      }
    })
  }


  ngOnInit(): void {
  }

  onMainTabChange(selectedTab:MainMenu){
    this.selectedIndex = selectedTab.id;
    // this.routingService.onTriggerStudentTab(selectedTab.subMenus);
    this.router.navigate([], { queryParams: { find: this.selectedIndex }, queryParamsHandling: 'merge' });
  }

}
