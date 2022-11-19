import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarMenuComponent } from './left-sidebar-menu.component';

describe('LeftSidebarMenuComponent', () => {
  let component: LeftSidebarMenuComponent;
  let fixture: ComponentFixture<LeftSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidebarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
