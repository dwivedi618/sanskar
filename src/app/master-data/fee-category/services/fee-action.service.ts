import { Injectable } from '@angular/core';
import { Action } from 'src/app/layouts/shared/menu-button/actions.enum';

@Injectable({
  providedIn: 'root'
})
export class FeeActionService {

  constructor() { }
  actionTriggered(action: Action) {
    switch (action) {
      case Action.DELETE:
        alert("Request delete item");
        break;
      case Action.EDIT:
        alert("Request edit item");
        break;
      default:
        break;
    }
  }
}
