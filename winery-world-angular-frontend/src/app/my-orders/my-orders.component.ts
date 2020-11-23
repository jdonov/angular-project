import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {OrderServiceDTO, OrderWineView} from './my-orders.model';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  received: boolean;
  receivedSubscription: Subscription;
  orders: Observable<OrderServiceDTO[]>;
  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.receivedSubscription = this.route.queryParams.subscribe((params: Params) => this.received = params.received);
    this.orders = this.store.select(state => state.myOrders.receivedOrders);
  }

  ngOnDestroy(): void {
    this.receivedSubscription.unsubscribe();
  }
}
