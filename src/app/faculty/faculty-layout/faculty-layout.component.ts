import { ExpandInOutAnimation } from './../../services/animation/dropdown-animation';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-faculty-layout',
  templateUrl: './faculty-layout.component.html',
  styleUrls: ['./faculty-layout.component.css'],
  animations : [ExpandInOutAnimation]
})
export class FacultyLayoutComponent implements OnInit {

  links = [
    { path: 'all', name: 'All' },
    { path: 'files', name: 'Files' },
    { path: 'notes', name: 'Notes' },
  ];

  activeLink = this.links[0].path;
  expandAnimation = "collapsed";

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,

  ) {
    route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      // const activeLinkWithParam = (event.url.split('/').pop())      
      // console.log("activeLinkWithParam", activeLinkWithParam);
      // this.activeLink = activeLinkWithParam.split('?')[0]
      // console.log("activeLink", this.activeLink);

    });
  }

  ngOnInit() {
  this.activeLink = this.links[0].path;

  }
  toggleAnimation(divName: string) {
    if (divName === 'divA') {
      this.expandAnimation = this.expandAnimation === 'expanded' ? 'collapsed' : 'expanded';
      console.log(this.expandAnimation);
    }
  }

}
