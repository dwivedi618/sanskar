import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStandardComponent } from './master-standard.component';

describe('MasterStandardComponent', () => {
  let component: MasterStandardComponent;
  let fixture: ComponentFixture<MasterStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
