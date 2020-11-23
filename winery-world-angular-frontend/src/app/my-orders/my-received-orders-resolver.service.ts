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
export class MyReceivedOrdersResolverService implements Resolve<OrderServiceDTO[]> {
  received: boolean;

  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderServiceDTO[]> | Promise<OrderServiceDTO[]> | OrderServiceDTO[] {
    return this.store.select(st => st.myOrders.receivedOrders).pipe(
      take(1),
      switchMap(orders => {
        if (!orders) {
          this.store.dispatch(new AllOrdersActions.FetchReceivedOrders());
          return this.actions$.pipe(
            ofType(AllOrdersActions.SET_RECEIVED_ORDERS),
            take(1)
          );
        } else {
          return of(orders);
        }
      })
    );
  }

}
