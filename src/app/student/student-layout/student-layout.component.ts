import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainMenu } from 'src/app/layouts/shared/uiComponents/left-sidebar-menu/sidebar.menus';
import { API_SERVICE_METHODS } from 'src/app/services/api.methods';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent implements OnInit {
  studentId: any;
  selectedIndex: any;
  menus: MainMenu[];
  name: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
  ) { 
    this.activatedRoute.queryParams.subscribe((data) => {
      console.log("activated route data", data);
      if (data && data.id) {
        this.studentId = data.id;
        this.name = data.name;
        console.log("student Name",this.name)
        // this.getProfile();
        // this.getFeeDetails();
        if (data.find) {
          this.selectedIndex = data.find
        }
      }
    })
  }


  ngOnInit(): void {
    this.commonService[API_SERVICE_METHODS.getStudentMenuTab]().subscribe((data: MainMenu[]) => { 
      this.menus = data ;
      console.log("studentMenu",this.menus);

    });
  }

  onMainTabChange(selectedTab:MainMenu){
    this.selectedIndex = selectedTab.id;
    this.router.navigate([], { queryParams: { find: this.selectedIndex }, queryParamsHandling: 'merge' });
  }

}
