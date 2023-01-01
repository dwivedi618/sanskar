import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/layouts/shared/dialog.service';
import { Action } from 'src/app/layouts/shared/uiComponents/menu-button/actions.enum';
import { AlertService } from 'src/app/services/alert.service';
import { FeeApiService } from './fee-api.service';

@Injectable({
  providedIn: 'root'
})
export class FeeActionService {

  constructor(
    private feeApiService : FeeApiService,
    private alertService : AlertService,
    private dialogService : DialogService
    ) { }
  actionTriggered(action: Action,data):Observable<any> {
    switch (action) {
      case Action.DELETE:
         this.alertService.alertWithAction([`Delete ${data.name}.`,'Are you sure?'],'Delete').subscribe(result=>{
          if(result === "Delete"){
            console.log("result",result);
            return result.asObservable();
            // return this.feeApiService.delete(data)
          } 
        })
      case Action.EDIT:
        this.dialogService.manageFeeCategory(data,action);
        break;
      default:
        break;
    }
    return
  }
}
