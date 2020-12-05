import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineAddedAlertComponent } from './wine-added-alert.component';

describe('WineAddedAlertComponent', () => {
  let component: WineAddedAlertComponent;
  let fixture: ComponentFixture<WineAddedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineAddedAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineAddedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
