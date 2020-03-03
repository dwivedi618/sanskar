import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-studentcompletedetails',
  templateUrl: './studentcompletedetails.component.html',
  styleUrls: ['./studentcompletedetails.component.css']
})
export class StudentcompletedetailsComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.getData()
      
  }

}
