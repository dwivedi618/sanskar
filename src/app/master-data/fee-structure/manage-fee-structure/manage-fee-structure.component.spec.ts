import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeStructureComponent } from './manage-fee-structure.component';

describe('ManageFeeStructureComponent', () => {
  let component: ManageFeeStructureComponent;
  let fixture: ComponentFixture<ManageFeeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFeeStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
