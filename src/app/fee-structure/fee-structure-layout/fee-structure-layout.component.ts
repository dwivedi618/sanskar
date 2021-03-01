import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee-structure-layout',
  templateUrl: './fee-structure-layout.component.html',
  styleUrls: ['./fee-structure-layout.component.css']
})
export class FeeStructureLayoutComponent implements OnInit {

  links = [
    { path: 'master-fee-structure', name: 'Master Fee Structure' },
    { path: 'master-fee-category', name: 'Master Fee Category' },

  ];

  activeLink = this.links[0].path;
  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.router.navigate['fee-structure/master-fee-structure'];
    this.activeLink = this.links[0].path;
  
  }

}
