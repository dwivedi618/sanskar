import { Component } from '@angular/core';
import { ToggleService } from "./services/toggle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sanskar';
  isAppOpen= true; 
  constructor(private toggleService : ToggleService){}

}
