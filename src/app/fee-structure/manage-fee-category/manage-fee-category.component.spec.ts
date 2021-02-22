import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeCategoryComponent } from './manage-fee-category.component';

describe('ManageFeeCategoryComponent', () => {
  let component: ManageFeeCategoryComponent;
  let fixture: ComponentFixture<ManageFeeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFeeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
