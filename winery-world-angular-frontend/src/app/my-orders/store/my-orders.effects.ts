import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as AllOrdersActions from '../store/my-orders.actions';
import * as fromApp from '../../store/app.reducer';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {OrderServiceDTO, OrderWineBindingDTO} from '../my-orders.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const END_POINT_FETCH_ORDERS_RECEIVED = 'api/orders/owner';
const END_POINT_FETCH_ORDERS_SENT = 'api/orders/client';
const END_POINT_PLACE_ORDER = 'api/orders/placeOrder';

@Injectable()
export class MyOrdersEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchReceivedOrders = this.actions$.pipe(
    ofType(AllOrdersActions.FETCH_RECEIVED_ORDERS),
    switchMap((action: any) => {
      return this.http.get<OrderServiceDTO[]>(environment.apiURL + END_POINT_FETCH_ORDERS_RECEIVED);
      }),
    map(orders => new AllOrdersActions.SetReceivedOrders(orders))
  );

  @Effect()
  fetchSentOrders = this.actions$.pipe(
    ofType(AllOrdersActions.FETCH_SENT_ORDERS),
    switchMap((action: any) => {
      return this.http.get<OrderServiceDTO[]>(environment.apiURL + END_POINT_FETCH_ORDERS_SENT);
    }),
    map(orders => {
      return new AllOrdersActions.SetSentOrders(orders);
    })
  );

  @Effect()
  sendOrder = this.actions$.pipe(
    ofType(AllOrdersActions.SEND_ORDER_START),
    withLatestFrom(this.store.select(state => state.myOrders.shoppingCart)),
    switchMap(([actionData, shoppingCartState]) => {
      const mappedOrder = shoppingCartState.orderedWines.map(w => {
          const wineOrder: OrderWineBindingDTO = {id: w.id, quantity: w.quantity};
          return wineOrder;
        });
      const updatedShoppingCart = {
        ...shoppingCartState,
        orderedWines: mappedOrder
      };
      return this.http.post<OrderServiceDTO>(environment.apiURL + END_POINT_PLACE_ORDER, updatedShoppingCart);
    }),
    map(() => new AllOrdersActions.SendOrderSuccess())
  );
}
