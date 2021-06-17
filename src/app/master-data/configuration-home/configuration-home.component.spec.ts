import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationHomeComponent } from './configuration-home.component';

describe('ConfigurationHomeComponent', () => {
  let component: ConfigurationHomeComponent;
  let fixture: ComponentFixture<ConfigurationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
