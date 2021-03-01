import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standard-layout',
  templateUrl: './standard-layout.component.html',
  styleUrls: ['./standard-layout.component.css']
})
export class StandardLayoutComponent implements OnInit {

  links = [
    { path: 'master-standard', name: 'Master Standard' },
    // { path: 'master-fee-category', name: 'Master Fee Category' },
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

