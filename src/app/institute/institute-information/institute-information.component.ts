import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layouts/shared/dialog.service';

@Component({
  selector: 'app-institute-information',
  templateUrl: './institute-information.component.html',
  styleUrls: ['./institute-information.component.scss']
})
export class InstituteInformationComponent implements OnInit {

  constructor(
    private dialogService : DialogService
  ) { }

  ngOnInit(): void {
    this.manageInstituteInformation();
  }

  manageInstituteInformation() {
    this.dialogService.manageInstituteInformation().subscribe(()=>{this.refresh()});
  }
  refresh(){

  }

}
