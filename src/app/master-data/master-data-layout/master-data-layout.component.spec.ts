import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataLayoutComponent } from './master-data-layout.component';

describe('MasterDataLayoutComponent', () => {
  let component: MasterDataLayoutComponent;
  let fixture: ComponentFixture<MasterDataLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDataLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
