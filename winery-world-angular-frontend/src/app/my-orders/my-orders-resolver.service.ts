import {ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {OrderServiceDTO} from './my-orders.model';
import {Observable, of} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map, switchMap, take} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AllOrdersActions from '../my-orders/store/my-orders.actions';

@Injectable({providedIn: 'root'})
export class MyOrdersResolverService implements Resolve<OrderServiceDTO[]>{
  received: boolean;
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderServiceDTO[]> | Promise<OrderServiceDTO[]> | OrderServiceDTO[] {
    this.received = route.queryParams.received;
    return this.store.select(st => this.received ? st.myOrders.receivedOrders : st.myOrders.sentOrders).pipe(
      take(1),
      switchMap(orders => {
        if (!orders) {
          if (this.received) {
            this.store.dispatch(new AllOrdersActions.FetchReceivedOrders());
            return this.actions$.pipe(
              ofType(AllOrdersActions.SET_RECEIVED_ORDERS),
              take(1)
            );
          } else {
            this.store.dispatch(new AllOrdersActions.FetchSentOrders());
            return this.actions$.pipe(
              ofType(AllOrdersActions.SET_SENT_ORDERS),
              take(1)
            );
          }
        } else {
          return of(orders);
        }
      })
    );
  }

}
