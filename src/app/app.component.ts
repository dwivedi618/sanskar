import { Component } from '@angular/core';
import { ToggleService } from "./services/toggle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sanskar';
  isAppOpen= true; 
  constructor(private toggleService : ToggleService){}

}
