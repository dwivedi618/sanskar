import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Router, 
  ActivatedRoute, 
  NavigationStart, 
  NavigationEnd,
   NavigationError,
    NavigationCancel,
    Event } 
    from '@angular/router';
@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
    );

 
  links = [
    { path: 'chat', name: 'Chat' },
    { path: 'files', name: 'Files' },
    { path: 'notes', name: 'Notes' },
  ];

  activeLink = this.links[0].path;
  routing: boolean;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,

  ) {
    route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      const activeLinkWithParam = (event.url.split('/').pop())      
      console.log("activeLinkWithParam", activeLinkWithParam);
      this.activeLink = activeLinkWithParam.split('?')[0]
      console.log("activeLink", this.activeLink);

    });
    this.routeChange()
  }

  ngOnInit() {
  }

  routeChange(){
    this.route.events.subscribe((event:Event)=>{
      switch(true){
        case event instanceof NavigationStart : {
          this.routing = true;
          // console.log("homeRouterLoader",this.homeRouteLoader)
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:{
          this.routing = false ;
          break;
        }
        default : {
          break;
        }
      }
    })
  }

}
