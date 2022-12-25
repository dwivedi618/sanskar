import { Component, Input, OnInit } from '@angular/core';
import { Loader, UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() loader: Loader = {isLoading : false,oMessage: "Loading..."}
  constructor(){
    console.log("loader**component",this.loader)
  }
}
