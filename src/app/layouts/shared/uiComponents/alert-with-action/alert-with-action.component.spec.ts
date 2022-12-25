import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWithActionComponent } from './alert-with-action.component';

describe('AlertWithActionComponent', () => {
  let component: AlertWithActionComponent;
  let fixture: ComponentFixture<AlertWithActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertWithActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWithActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
