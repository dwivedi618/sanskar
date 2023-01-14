
import { query } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ApiResponse } from 'src/app/utils/apiResponce.interface';
import { environment } from 'src/environments/environment';
import { Address, Parent, PermanentAddress, Student } from '../student.interface';

@Injectable({
    providedIn: 'root'
})
export class PermanentAddressApiService {
    private API_ROUTES = {
        fee: environment.apiUrl + '/' + 'fee',
        class: environment.apiUrl + '/' + 'class',
        feeStructure: environment.apiUrl + '/' + 'feeStructure',
        student: environment.apiUrl + '/' + 'student',
        parent: environment.apiUrl + '/' + 'parent',
        address: environment.apiUrl + '/' + 'address',
        localAddress: environment.apiUrl + '/' + 'address' +  '/' +"localAddress",
        permanentAddress: environment.apiUrl + '/' + 'address'+ '/' +"permanentAddress",
    }

    private $permanentAddress = new BehaviorSubject<PermanentAddress>({} as PermanentAddress);

    public get permanentAddress() {
        return this.$permanentAddress.asObservable()
    }

    public setPermanentAddress(data: PermanentAddress) {
        this.$permanentAddress.next(data);
    }

    constructor(private _http: HttpClient) { }

    fetchPermanentAddrByStudentId(studentId): Observable<PermanentAddress> {
        return this._http.get<PermanentAddress>(this.API_ROUTES.permanentAddress + '?' + 'studentId=' + studentId).pipe(pluck('data'))
    }
    updatePermanentAddress(data: Parent): Observable<ApiResponse> {
        return this._http.patch<ApiResponse>(this.API_ROUTES.permanentAddress + '?' + 'studentId=' + data.studentId, data);
    }
    addPermanentAddress(data: Parent): Observable<ApiResponse> {
        return this._http.post<ApiResponse>(this.API_ROUTES.permanentAddress + '?' + 'studentId=' + data.studentId, data);
    }
   

}


