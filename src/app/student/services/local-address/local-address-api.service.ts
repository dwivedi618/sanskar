
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ApiResponse } from 'src/app/utils/apiResponce.interface';
import { environment } from 'src/environments/environment';
import { LocalAddress, Parent } from '../../student.interface';

@Injectable({
    providedIn: 'root'
})
export class LocalAddressApiService {
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

    private $localAddress = new BehaviorSubject<LocalAddress>({} as LocalAddress);

    public get localAddress() {
        return this.$localAddress.asObservable()
    }

    public setLocalAddressData(data: LocalAddress) {
        this.$localAddress.next(data);
    }

    constructor(private _http: HttpClient) { }

    fetchLocalAddressByStudentId(studentId): Observable<LocalAddress> {
        return this._http.get<Parent>(this.API_ROUTES.localAddress + '?' + 'studentId=' + studentId).pipe(pluck('data'))
    }
    updateLocalAddress(data: LocalAddress): Observable<ApiResponse> {
        return this._http.patch<ApiResponse>(this.API_ROUTES.localAddress + '?' + 'studentId=' + data.studentId, data);
    }
    addLocalAddress(data: LocalAddress): Observable<ApiResponse> {
        return this._http.post<ApiResponse>(this.API_ROUTES.localAddress + '?' + 'studentId=' + data.studentId, data);
    }
   

}


