
import { query } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ApiResponse } from 'src/app/utils/apiResponce.interface';
import { environment } from 'src/environments/environment';
import { Address, Parent, Student } from '../student.interface';

@Injectable({
    providedIn: 'root'
})
export class ParentApiService {
    private API_ROUTES = {
        fee: environment.apiUrl + '/' + 'fee',
        class: environment.apiUrl + '/' + 'class',
        feeStructure: environment.apiUrl + '/' + 'feeStructure',
        student: environment.apiUrl + '/' + 'student',
        parent: environment.apiUrl + '/' + 'parent',
        address: environment.apiUrl + '/' + 'address',
    }

    private $parent = new BehaviorSubject<Parent>({} as Parent);

    public get parentData() {
        return this.$parent.asObservable()
    }

    public setParentData(data: Parent) {
        this.$parent.next(data);
    }

    constructor(private _http: HttpClient) { }

    fetchParentByStudentId(studentId): Observable<Parent> {
        return this._http.get<Parent>(this.API_ROUTES.parent + '?' + 'studentId=' + studentId).pipe(pluck('data'))
    }
    updateParent(data: Parent): Observable<ApiResponse> {
        return this._http.patch<ApiResponse>(this.API_ROUTES.parent + '?' + 'studentId=' + data.studentId, data);
    }
    addParent(data: Parent): Observable<ApiResponse> {
        return this._http.post<ApiResponse>(this.API_ROUTES.parent + '?' + 'studentId=' + data.studentId, data);
    }
   

}


