import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-home',
  templateUrl: './configuration-home.component.html',
  styleUrls: ['./configuration-home.component.css']
})
export class ConfigurationHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  configurationLink=[
    {
      title : 'Register Classes', 
      url : './master-standard' ,
      subtitle : '',
      text : 'Register your class,how many class your institute have?'
    },
    {
      title : 'Fee Category', 
      url : './master-fee-category' ,
      subtitle : '',
      text : 'your class,how many class your institute have?'
    },
    {
      title : 'Fee Structure', 
      url : './fee-structure' ,
      subtitle : '',
      text : 'Register your class,how many class your institute have?'
    }
  ]

}
