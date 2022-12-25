import { Component, OnInit } from '@angular/core';
import { Loader, UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  loader : Loader = { isLoading : false , oMessage : "Loading..."};
  constructor(private uiService : UiService) { }
  ngOnInit() {
    this.uiService.loader.state.subscribe((loader: Loader) => { this.loader= loader;console.log("loader:::**::",loader)});

  }

}
