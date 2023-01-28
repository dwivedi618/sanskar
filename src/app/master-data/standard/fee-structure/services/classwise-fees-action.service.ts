import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { ClassApiService } from '../../services/class-api.service';


@Injectable({
  providedIn: 'root'
})
export class ClasswiseFeesActionService {

  constructor(
    private classApiService: ClassApiService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) { }
  actionTriggered(action: Action, data): Observable<any> {
    let resultObservable = new BehaviorSubject<any>('');
    let displayDeletePharses = [`Delete ${data.name}.`, 'Are you sure?'];
    switch (action) {
      case Action.DELETE:
        //Delete not implemented for class wise fees
        break;
      case Action.EDIT:
      case Action.UPDATE:
        this.dialogService.manageFeeStructure(data, action).subscribe(result => {
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
