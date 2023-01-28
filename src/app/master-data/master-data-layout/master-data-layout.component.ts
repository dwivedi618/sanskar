
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-master-data-layout',
  templateUrl: './master-data-layout.component.html',
  styleUrls: ['./master-data-layout.component.css']
})
export class MasterDataLayoutComponent implements OnInit {

  links = [
    { path: 'fee-structure', name: 'Master Fee Structure' },
    { path: 'master-fee-category', name: 'Master Fee Category' },
    { path: 'classes', name: 'Master Standard' },


  ];
  activeLink: string;

  // activeLink = this.links[0].path;
  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
  ) { }
  ngOnInit(): void {}
}
