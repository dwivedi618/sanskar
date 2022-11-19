import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFeeCategoryListComponent } from './master-fee-category-list.component';

describe('MasterFeeCategoryListComponent', () => {
  let component: MasterFeeCategoryListComponent;
  let fixture: ComponentFixture<MasterFeeCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterFeeCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFeeCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
