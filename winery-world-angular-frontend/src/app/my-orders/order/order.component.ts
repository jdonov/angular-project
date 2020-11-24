import {Component, Input, OnInit} from '@angular/core';
import {OrderServiceDTO} from '../my-orders.model';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {CancelOrderStart, ConfirmOrderStart} from '../store/my-orders.actions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: OrderServiceDTO;
  @Input() received: boolean;
  showWines: boolean;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.showWines = false;
  }

  viewWines(): void {
    this.showWines = !this.showWines;
  }

  confirmOrder(): void {
    this.store.dispatch(new ConfirmOrderStart({id: this.order.id}));
  }

  cancelOrder(): void {
    this.store.dispatch(new CancelOrderStart({id: this.order.id}));
  }

  totalPrice(): number {
    return this.order.wines
      .map(w => w.quantity * w.price)
      .reduce((acc, curr) => acc + curr, 0);
  }
}
