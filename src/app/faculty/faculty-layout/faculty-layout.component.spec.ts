import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyLayoutComponent } from './faculty-layout.component';

describe('FacultyLayoutComponent', () => {
  let component: FacultyLayoutComponent;
  let fixture: ComponentFixture<FacultyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
