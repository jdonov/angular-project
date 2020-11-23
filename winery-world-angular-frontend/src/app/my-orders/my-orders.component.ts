import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {OrderWineView} from './my-orders.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Observable<OrderWineView[]>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.orders = this.store.select('order').pipe(
      map(st => st.orderedWines)
    );
  }

}
