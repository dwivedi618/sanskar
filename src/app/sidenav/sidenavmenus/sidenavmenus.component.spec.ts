import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavmenusComponent } from './sidenavmenus.component';

describe('SidenavmenusComponent', () => {
  let component: SidenavmenusComponent;
  let fixture: ComponentFixture<SidenavmenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavmenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavmenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
