import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWineriesComponent } from './my-wineries.component';

describe('MyWineriesComponent', () => {
  let component: MyWineriesComponent;
  let fixture: ComponentFixture<MyWineriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWineriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWineriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
