import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStandardListComponent } from './master-standard-list.component';

describe('MasterStandardListComponent', () => {
  let component: MasterStandardListComponent;
  let fixture: ComponentFixture<MasterStandardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterStandardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStandardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
