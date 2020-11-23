import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySentOrdersComponent } from './my-sent-orders.component';

describe('MySentOrdersComponent', () => {
  let component: MySentOrdersComponent;
  let fixture: ComponentFixture<MySentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySentOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
