import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton-loader',
  templateUrl: './skelton-loader.component.html',
  styleUrls: ['./skelton-loader.component.scss']
})
export class SkeltonLoaderComponent implements OnInit {
  @Input() private length : number;
  public fields = []
  constructor() { }

  ngOnInit(): void {
    console.log(this.fields);
    this.fields = Array.from(Array(this.length).keys())
    
  }

}
