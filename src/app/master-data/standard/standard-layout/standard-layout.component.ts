import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainMenu } from 'src/app/layouts/layout/left-sidebar-menu/sidebar.menus';
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
  selectedStandardName: any;
  standardId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public routingService : RoutingService,
    private router: Router,
    private classApiService : ClassApiService
  ) { 
    this.activatedRoute.queryParams.subscribe(data => {
      if (data) {
        if (data.standardId) {
          this.standardId = data.standardId
        }
        if (data.n) {
          this.selectedStandardName = data.n
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
    console.log("on class select",selectionObj);
    this.router.navigate([], { queryParams: { standardId: selectionObj._id, n: selectionObj.name }, queryParamsHandling: 'merge' });
  }
  onMainTabChange(selectedTab:MainMenu){
    this.selectedIndex = selectedTab.id;
    this.routingService.onTriggerStudentTab(selectedTab.subMenus);
    this.router.navigate([selectedTab.path], { queryParams: { find: this.selectedIndex }, queryParamsHandling: 'merge' });
  }

}

