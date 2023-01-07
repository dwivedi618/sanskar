import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { ClassApiService } from './class-api.service';


@Injectable({
  providedIn: 'root'
})
export class ClassActionService {

  constructor(
    private classApiService: ClassApiService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) { }
  actionTriggered(action: Action, data): Observable<any> {
    let resultObservable = new BehaviorSubject<any>('');
    switch (action) {
      case Action.DELETE:
        this.alertService.alertWithAction([`Delete ${data.name}.`, 'Are you sure?'], 'Delete').subscribe(result => {
          if (result === "Delete") {
            return this.classApiService.delete(data).subscribe(
              result => {
                //if success
                resultObservable.next(result);
              })
          }
        })
        break;
      case Action.EDIT:
      case Action.UPDATE:
        this.dialogService.manageMasterStandard(data, action).subscribe(result => {
          resultObservable.next(result);
        });
        break;
      case Action.ADD:
        this.dialogService.manageFeeStructure(data, action).subscribe(result => {
          resultObservable.next(result);
        });break;
      default:
        break;
    }
    return resultObservable.asObservable();
  }
}
