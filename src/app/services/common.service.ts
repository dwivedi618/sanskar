import { Student } from './../student/students-list/students-list.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JsonFormControlOptions, JsonFormControlsMethod } from '../layouts/shared/json-form/json-from.types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { METHODS as DROPDOWN_METHODS } from '../admission/dropdown.methods';
import { API_SERVICE_METHODS } from './api.methods';
import { filter, map, pluck } from 'rxjs/operators';
import { MainMenu } from '../layouts/layout/left-sidebar-menu/sidebar.menus';

export interface District {
  [stateCode: string]: string[];
}
export const API_ROUTES = {
  fee: environment.apiUrl + '/' + 'fee',
  class: environment.apiUrl + '/' + 'class',
  academicYear: environment.apiUrl + '/' + 'academicYear',
  quickRegistration : environment.apiUrl + '/' + 'student',
  admissionRequestList : environment.apiUrl + '/' + 'newRegistrations',
  feeStructure: environment.apiUrl + '/' + 'feeStructure',
  student: environment.apiUrl + '/' + 'student',
  parent: environment.apiUrl + '/' + 'parent',
  address: environment.apiUrl + '/' + 'address',
  section: environment.apiUrl + '/' + 'section',
  indianStatesUrl: "assets/jsons/indian.states.json",
  indianDistrictsUrl: "assets/jsons/indian.districts.json",
  mainMenuUrl: "assets/jsons/main-menu.json",
  studentMenuTabUrl: "assets/jsons/student.tabs.json",
  studentRegistrationMileStone: "assets/jsons/mile-stones/registration.milestone.json"
 
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  API_ROUTES = API_ROUTES;

  constructor(
    private http: HttpClient
  ) { }


  [API_SERVICE_METHODS.getClasses]() {
    return this.http.get<any>(this.API_ROUTES.class).pipe(pluck("data"));
  }

  [API_SERVICE_METHODS.getAcademicYearList](id:string) {
    return this.http.get<any>(this.API_ROUTES.academicYear).pipe(pluck("data"));
  }
  [API_SERVICE_METHODS.getFees](id: string) {
    return this.http.get<any>(this.API_ROUTES.fee + '/' + id).pipe(pluck('data'));
  }
  [API_SERVICE_METHODS.getSections](id: string) {
    return this.http.get<any>(this.API_ROUTES.section + '/' + id).pipe(pluck('data'));
  }
  [API_SERVICE_METHODS.getIndianStates]() {
    return this.http.get<{ _id: string, name: string }[]>(this.API_ROUTES.indianStatesUrl);
  }
  [API_SERVICE_METHODS.getIndianDistrctByState](stateCode) {
    return this.http.get<any>(this.API_ROUTES.indianDistrictsUrl)
      .pipe(
        pluck("data"),
      )
  }
  [API_SERVICE_METHODS.getMainMenus](): Observable<MainMenu[]> {
    return this.http.get<MainMenu[]>(this.API_ROUTES.mainMenuUrl);
  }

  [API_SERVICE_METHODS.getStudentMenuTab](): Observable<MainMenu[]> {
    return this.http.get<MainMenu[]>(this.API_ROUTES.studentMenuTabUrl);
  }

  formOptions = {};

  [DROPDOWN_METHODS.getClasses](method): Observable<JsonFormControlOptions[]> {
    this.formOptions[DROPDOWN_METHODS.getClasses + method.ctrlId] = new BehaviorSubject<JsonFormControlOptions[]>([]);
    this[API_SERVICE_METHODS.getClasses]().subscribe((data: { _id: string, name: string }[]) => {
      if (data.length) {
        let options = this.formatDataAsOptions(data);
        this.formOptions[DROPDOWN_METHODS.getClasses + method.ctrlId].next(options)
      }
    });
    return this.formOptions[DROPDOWN_METHODS.getClasses + method.ctrlId]
  }

  [DROPDOWN_METHODS.getIndianStates](method): Observable<JsonFormControlOptions[]> {
    this.formOptions[DROPDOWN_METHODS.getIndianStates + method.ctrlId] = new BehaviorSubject<JsonFormControlOptions[]>([]);
    this[API_SERVICE_METHODS.getIndianStates]().subscribe((data: { _id: string, name: string }[]) => {
      if (data.length) {
        let options = this.formatDataAsOptions(data);
        this.formOptions[DROPDOWN_METHODS.getIndianStates + method.ctrlId].next(options);
      }
    });
    return this.formOptions[DROPDOWN_METHODS.getIndianStates + method.ctrlId].asObservable();
  }

  [DROPDOWN_METHODS.getDistricts](method: JsonFormControlsMethod): Observable<JsonFormControlOptions[]> {
    const { ctrlId } = method;
    this.formOptions[DROPDOWN_METHODS.getDistricts + ctrlId] = new BehaviorSubject<JsonFormControlOptions[]>([]);
    this[API_SERVICE_METHODS.getIndianDistrctByState]().subscribe((data: { [x: string]: string[] }) => {
      if (data) {
        let districts = data[method.value] || [];
        if (!districts.length) return;
        let mappedDistricts = districts.map((district: string) => {
          return {
            _id: district,
            name: district
          }
        })
        let options = this.formatDataAsOptions(mappedDistricts || []);
        this.formOptions[DROPDOWN_METHODS.getDistricts + ctrlId].next(options);
      }
    });
    return this.formOptions[DROPDOWN_METHODS.getDistricts + ctrlId].asObservable();
  }

  private formatDataAsOptions(data: { _id: string, name: string }[]) {
    let options: JsonFormControlOptions[] = [];
    data.forEach(item => {
      let option: JsonFormControlOptions = { value: "", label: "", icon: "" };
      option.value = item._id;
      option.label = item.name;
      option.icon = "";
      options.push(option);
    })
    return options;
  }


  [API_SERVICE_METHODS.getFees](id: String = '') {
    return this.http.get<any>(this.API_ROUTES.fee + '/' + id);
  }

  studentFeeDeposit(studentId, fee) {
    return this.http.post<any>(`${environment.apiUrl}/v1/student/${studentId}/fee-deposit`, fee)
  }
  studentFeeDetails(studentId) {
    return this.http.get<any>(`${environment.apiUrl}/v1/student/${studentId}/fee-detail`)
  }

}