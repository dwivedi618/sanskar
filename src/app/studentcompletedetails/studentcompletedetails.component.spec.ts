import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentcompletedetailsComponent } from './studentcompletedetails.component';

describe('StudentcompletedetailsComponent', () => {
  let component: StudentcompletedetailsComponent;
  let fixture: ComponentFixture<StudentcompletedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentcompletedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentcompletedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
