import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineryCardComponent } from './winery-card.component';

describe('WineryCardComponent', () => {
  let component: WineryCardComponent;
  let fixture: ComponentFixture<WineryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
