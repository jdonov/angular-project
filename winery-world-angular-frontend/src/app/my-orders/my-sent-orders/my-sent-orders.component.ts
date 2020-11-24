import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {OrderServiceDTO} from '../my-orders.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-my-sent-orders',
  templateUrl: './my-sent-orders.component.html',
  styleUrls: ['./my-sent-orders.component.css']
})
export class MySentOrdersComponent implements OnInit, OnDestroy {

  received: boolean;
  receivedSubscription: Subscription;
  orders: Observable<OrderServiceDTO[]>;
  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.receivedSubscription = this.route.queryParams.subscribe((params: Params) => this.received = params.received === 'true');
    this.orders = this.store.select(state => state.myOrders.sentOrders);
  }

  ngOnDestroy(): void {
    this.receivedSubscription.unsubscribe();
  }

}
