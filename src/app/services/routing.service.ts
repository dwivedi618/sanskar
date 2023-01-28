import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { MainMenu, SubMenu } from '../layouts/shared/uiComponents/left-sidebar-menu/sidebar.menus';
import { API_SERVICE_METHODS } from './api.methods';

//to fetch main menu , student menu and submenu declare routings
export const API_URLS_FOR_MENUS = {
  mainMenuUrl: "assets/jsons/main-menu.json",
  studentMenuTabUrl: "assets/jsons/student.tabs.json",
  instituteMenuTabUrl : "assets/jsons/institute.tabs.json",
}
@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  API_URLS = API_URLS_FOR_MENUS
  private $studentTabs = new BehaviorSubject<MainMenu[]>([]);
  private $activeStudentTabSubMenus = new BehaviorSubject<MainMenu[]>([]);

  private $activeSubMenus = new BehaviorSubject<SubMenu[]>([]);


  onTriggerStudentTab(tabs:MainMenu[]){
    this.$activeStudentTabSubMenus.next(tabs);
  }



  onTriggerMainTab(tab:MainMenu){
    this.$activeSubMenus.next(tab.subMenus);
  }

  setStudentTabs(tabs : MainMenu[]){
    this.$studentTabs.next(tabs);
  }
  
  public get studentTabs()  {
    return this.$studentTabs.asObservable();
  }
  public get activeStudentTabSubMenus()  {
    return this.$activeStudentTabSubMenus.asObservable();
  }
  

  constructor(private http: HttpClient) { }

  [API_SERVICE_METHODS.getMainMenus](): Observable<MainMenu[]> {
    return this.http.get<MainMenu[]>(this.API_URLS.mainMenuUrl);
  }

  [API_SERVICE_METHODS.getStudentMenuTab](): Observable<MainMenu[]> {
    return this.http.get<MainMenu[]>(this.API_URLS.studentMenuTabUrl);
  }

  [API_SERVICE_METHODS.getInstituteMenuTab](): Observable<MainMenu[]> {
    return this.http.get<MainMenu[]>(this.API_URLS.instituteMenuTabUrl);
  }


}
