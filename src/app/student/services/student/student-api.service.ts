
import { query } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { API_ROUTES } from 'src/app/services/common.service';
import { ApiResponse } from 'src/app/utils/apiResponce.interface';
import { environment } from 'src/environments/environment';
import { Address, Parent, Student } from '../../student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {
  private API_ROUTES = API_ROUTES

  $studentsBasicInfo = this.fetchStudents().pipe(
    pluck("data"),
    map((_students: Student[]) => {
      return _students.map((student: Student) => {
        let name = this.name(student);
        const admissionInClass = student?.classId["name"] || "";
        return { ...student,name, admissionInClass}
      })
    }))

  private $student = new Subject<Student>();
  private $parent = new Subject<any>();
  private $address = new Subject<Address>();


  public get studentData(): Observable<Student> {
    return this.$student.asObservable()
  }

  public setStudentData(studentData: Student) {
    this.$student.next(studentData);
  }
  public get parentData(): Observable<Parent> {
    return this.$parent.asObservable()
  }

  public setParentData(data: Parent) {
    this.$parent.next(data);
  }
  public get address():Observable<Address> {
    return this.$address.asObservable()
  }

  public setAddress(data: Address) {
    this.$address.next(data);
  }


  constructor(private _http: HttpClient) { }

  delete(data) {
    let options = {
      headers: new HttpHeaders,
      body: data
    }
    console.log("aoi del data", data)
    return this._http.delete(this.API_ROUTES.student, options);
  }
  add(data) {
    return this._http.post<ApiResponse>(this.API_ROUTES.student, data);
  }
  fetchStudents():Observable<Student[]> {
    return this._http.get<Student[]>(this.API_ROUTES.student)
  }
  fetchStudentById(studentId: string): Observable<Student> {
    return this._http.get<Student>(this.API_ROUTES.student + '?' + 'studentId=' + studentId)
      .pipe(
        pluck('data'),
        map((student: Student) => {
          let name = this.name(student);
          const admissionInClass = student?.classId["name"] || "";
          return { name, admissionInClass, ...student }
        })
      )
  }
  private name(data): string {
    const { firstName = '', middleName = '', lastName = '' } = data || {};
    return `${firstName} ${middleName} ${lastName}`
  }

  update(data) {
    return this._http.patch<any>(this.API_ROUTES.student, data).pipe()
  }

  fetchParentByStudentId(studentId): Observable<Parent> {
    return this._http.get<Parent>(this.API_ROUTES.parent + '?' + 'studentId=' + studentId).pipe(pluck('data'))
  }

  fetchAddressByStudentId(studentId): Observable<Address> {
    return this._http.get<Parent>(this.API_ROUTES.address + '?' + 'studentId=' + studentId).pipe(pluck('data'))
  }
  fetchStudentCompleteProfileByStudentId(studentId): Observable<[Student, Parent, Address]> {
    let student = this.fetchStudentById(studentId);
    let parent = this.fetchParentByStudentId(studentId);
    let address = this.fetchAddressByStudentId(studentId);
    return forkJoin([student, parent, address]);

  }
}


