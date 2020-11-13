import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEditWineryComponent } from './register-edit-winery.component';

describe('RegisterEditWineryComponent', () => {
  let component: RegisterEditWineryComponent;
  let fixture: ComponentFixture<RegisterEditWineryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEditWineryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEditWineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
