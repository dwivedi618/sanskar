import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRegisterComponent } from './class-register.component';

describe('ClassRegisterComponent', () => {
  let component: ClassRegisterComponent;
  let fixture: ComponentFixture<ClassRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
