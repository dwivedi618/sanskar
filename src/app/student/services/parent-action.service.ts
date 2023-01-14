import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { ParentFormComponent } from '../student-profile-layout/parent-form/parent-form.component';
import { StudentFormComponent } from '../student-profile-layout/student-form/student-form.component';
import { StudentApiService } from './student-api.service';


@Injectable({
  providedIn: 'root'
})
export class ParentActionService {

  $isStudentFormVisible = new BehaviorSubject<Boolean>(false);
  showStudentForm(){
    this.$isStudentFormVisible.next(true);
  }
  hideStudentForm(){
    this.$isStudentFormVisible.next(false);
  }
  get isStudentFormVisible(){
    return this.$isStudentFormVisible.asObservable()
  }
  
  constructor(
    private studentApiService: StudentApiService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) { }
  actionTriggered(action: Action, data): Observable<any> {
    let resultObservable = new BehaviorSubject<any>('');
    switch (action) {
      case Action.DELETE:
        
        break;
      case Action.EDIT:
      case Action.UPDATE:
        this.dialogService.open(data, action,ParentFormComponent).subscribe(result => {
          resultObservable.next(result);
        });
        break;
      case Action.ADD:

        break;
      default:
        break;
    }
    return resultObservable.asObservable();
  }
}
