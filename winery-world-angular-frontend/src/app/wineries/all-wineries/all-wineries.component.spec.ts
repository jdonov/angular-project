import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWineriesComponent } from './all-wineries.component';

describe('AllWineriesComponent', () => {
  let component: AllWineriesComponent;
  let fixture: ComponentFixture<AllWineriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWineriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWineriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
