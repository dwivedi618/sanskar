import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMasterStandardComponent } from './manage-master-standard.component';

describe('ManageMasterStandardComponent', () => {
  let component: ManageMasterStandardComponent;
  let fixture: ComponentFixture<ManageMasterStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMasterStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
