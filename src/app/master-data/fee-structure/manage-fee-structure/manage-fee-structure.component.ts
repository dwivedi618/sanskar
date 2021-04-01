import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-fee-structure',
  templateUrl: './manage-fee-structure.component.html',
  styleUrls: ['./manage-fee-structure.component.css']
})
export class ManageFeeStructureComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * submit new faculty router back to faculty list
   */
  submit(){
    this.router.navigate(['/faculty']);
  }

}
