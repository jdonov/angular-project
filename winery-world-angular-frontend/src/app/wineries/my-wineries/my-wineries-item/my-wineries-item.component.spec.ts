import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWineriesItemComponent } from './my-wineries-item.component';

describe('MyWineriesItemComponent', () => {
  let component: MyWineriesItemComponent;
  let fixture: ComponentFixture<MyWineriesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWineriesItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWineriesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
