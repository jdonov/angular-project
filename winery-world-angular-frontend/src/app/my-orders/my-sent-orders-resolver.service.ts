import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {OrderServiceDTO} from './my-orders.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import * as AllOrdersActions from './store/my-orders.actions';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MySentOrdersResolverService implements Resolve<OrderServiceDTO[]>{
  received: boolean;
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderServiceDTO[]> | Promise<OrderServiceDTO[]> | OrderServiceDTO[] {
    this.received = route.queryParams.received;
    return this.store.select(st => st.myOrders.sentOrders).pipe(
      take(1),
      switchMap(orders => {
        if (!orders) {
            this.store.dispatch(new AllOrdersActions.FetchSentOrders());
            return this.actions$.pipe(
              ofType(AllOrdersActions.SET_SENT_ORDERS),
              take(1)
            );
        } else {
          return of(orders);
        }
      })
    );
  }

}
