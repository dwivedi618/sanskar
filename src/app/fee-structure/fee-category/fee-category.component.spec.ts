import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCategoryComponent } from './fee-category.component';

describe('FeeCategoryComponent', () => {
  let component: FeeCategoryComponent;
  let fixture: ComponentFixture<FeeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
