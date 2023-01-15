import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ROUTES } from "src/app/services/common.service";

@Injectable({
    providedIn: "root"
})
export class ClasswiseFeesApiService {
    constructor(private _http : HttpClient){}
    API_ROUTES = API_ROUTES;
    getMasterFeeStructure(session, classId) {
        return this._http.get<any>(this.API_ROUTES.feeStructure)
    }
    getClassFeeById(session, classId = '') {
        return this._http.get<any>(`${this.API_ROUTES.class}?classId=${classId}&session=${session}`);
    }
}