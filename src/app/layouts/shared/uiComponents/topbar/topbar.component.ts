import { ToggleService } from '../../../../services/toggle.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { AcademicYearApiService } from 'src/app/master-data/academic-year/services/academic-year-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent{
  constructor(
    private toggleService: ToggleService,
    private dialogService: DialogService,
    public academicYearApiService: AcademicYearApiService,
    private router: Router
  ) {}

  public toggleLeftSidebar() {
    this.toggleService.leftSidebarToggle.emit();
  }
  
  onDropdownSelect(selection: { _id: String, name: String }) {
    this.router.navigate([], { queryParams: { academicYearId: selection._id, academicYearName: selection.name }, queryParamsHandling: 'merge' })
  }
}
