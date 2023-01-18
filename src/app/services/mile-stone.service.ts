import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MileStone } from "../layouts/shared/milestone/milestone.component";
import { API_ROUTES } from "./common.service";

@Injectable({
    providedIn: "root"
})
export class MileStoneService{
    private API_ROUTES = API_ROUTES;
    private $studentRegistrationMileStone = new BehaviorSubject<MileStone>({} as MileStone);
    constructor(private _http: HttpClient){}

    studentRegistrationMileStone = this.fetchStudentRegistrationMileStone();
    private fetchStudentRegistrationMileStone():Observable<MileStone[]>{
        return this._http.get<MileStone[]>(this.API_ROUTES.studentRegistrationMileStone)
    }
}