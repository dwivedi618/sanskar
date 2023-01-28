import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainMenu } from 'src/app/layouts/shared/uiComponents/left-sidebar-menu/sidebar.menus';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { CommonService } from 'src/app/services/common.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ClassApiService } from '../services/class-api.service';

@Component({
  selector: 'app-standard-layout',
  templateUrl: './standard-layout.component.html',
  styleUrls: ['./standard-layout.component.scss']
})
export class StandardLayoutComponent implements OnInit {
  studentId: any;
  selectedIndex: any;
  menus: MainMenu[];
  name: string;
  $classesDropdown = this.classApiService.$classDropDown

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public routingService : RoutingService,
    private router: Router,
    private classApiService : ClassApiService
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
    this.routingService[API_SERVICE_METHODS.getStudentMenuTab]().subscribe((data: MainMenu[]) => { 
      this.routingService.setStudentTabs(data)
      console.log("studentMenu",data);
    });

    
  }

  onSelect(selectionObj: { _id : String, name : String }){

  }
  onMainTabChange(selectedTab:MainMenu){
    this.selectedIndex = selectedTab.id;
    this.routingService.onTriggerStudentTab(selectedTab.subMenus);
    this.router.navigate([selectedTab.path], { queryParams: { find: this.selectedIndex }, queryParamsHandling: 'merge' });
  }

}

