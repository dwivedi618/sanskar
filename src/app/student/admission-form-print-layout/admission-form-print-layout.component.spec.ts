import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFormPrintLayoutComponent } from './admission-form-print-layout.component';

describe('AdmissionFormPrintLayoutComponent', () => {
  let component: AdmissionFormPrintLayoutComponent;
  let fixture: ComponentFixture<AdmissionFormPrintLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionFormPrintLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionFormPrintLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
