import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReceivedOrdersComponent } from './my-received-orders.component';

describe('MyOrdersComponent', () => {
  let component: MyReceivedOrdersComponent;
  let fixture: ComponentFixture<MyReceivedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReceivedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReceivedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
