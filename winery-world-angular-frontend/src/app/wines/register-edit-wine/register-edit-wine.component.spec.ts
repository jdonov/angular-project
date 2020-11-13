import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEditWineComponent } from './register-edit-wine.component';

describe('RegisterEditWineComponent', () => {
  let component: RegisterEditWineComponent;
  let fixture: ComponentFixture<RegisterEditWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEditWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEditWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
