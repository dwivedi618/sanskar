import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skelton-loader',
  templateUrl: './skelton-loader.component.html',
  styleUrls: ['./skelton-loader.component.scss']
})
export class SkeltonLoaderComponent implements OnInit {
  @Input() private length : number;
  @Input() public cols : number[] = [4,8];//cols length decides skelton columns and index value its width base on bootstrap col-4 , col-6

  public fields = []
  constructor( ) { }

  ngOnInit(): void {
    this.fields = Array.from(Array(this.length).keys())
  }

}
