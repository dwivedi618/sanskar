import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStructureLayoutComponent } from './fee-structure-layout.component';

describe('FeeStructureLayoutComponent', () => {
  let component: FeeStructureLayoutComponent;
  let fixture: ComponentFixture<FeeStructureLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeStructureLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeStructureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
