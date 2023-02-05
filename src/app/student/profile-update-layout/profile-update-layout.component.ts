import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-update-layout',
  templateUrl: './profile-update-layout.component.html',
  styleUrls: ['./profile-update-layout.component.scss']
})
export class ProfileUpdateLayoutComponent implements OnInit {
  name: any;

  constructor(private activatedRoute : ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (data && data.id) {
        this.name = data.name;
      }
    })
   }

  ngOnInit(): void {
  }

}
