import { Injectable } from '@angular/core';
import { Action } from 'src/app/layouts/shared/menu-button/actions.enum';
import { FeeApiService } from './fee-api.service';

@Injectable({
  providedIn: 'root'
})
export class FeeActionService {

  constructor(private feeApiService : FeeApiService) { }
  actionTriggered(action: Action,data) {
    switch (action) {
      case Action.DELETE:
        this.feeApiService.delete(data).subscribe();
        break;
      case Action.EDIT:
        alert("Request edit item");
        break;
      default:
        break;
    }
  }
}
