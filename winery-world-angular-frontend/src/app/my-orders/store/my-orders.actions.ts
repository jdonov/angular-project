import {Action} from '@ngrx/store';
import {AddressUserBindingDTO, OrderPlaceBindingDTO, OrderServiceDTO, OrderWineView} from '../my-orders.model';

export const ADD_WINE_TO_ORDERS = '[Orders] Add new wine to order';
export const FETCH_RECEIVED_ORDERS = '[Orders] Fetch received orders';
export const SET_RECEIVED_ORDERS = '[Orders] Set received orders';
export const FETCH_SENT_ORDERS = '[Orders] Fetch sent orders';
export const SET_SENT_ORDERS = '[Orders] Set sent orders';
export const SEND_ORDER_START = '[Orders] Send orders start';
export const SEND_ORDER_SUCCESS = '[Orders] Send order success';
export const SET_RECEIVER_ADDRESS = '[Orders] Set receiver address';

export class AddWineToOrder implements Action {
  readonly type = ADD_WINE_TO_ORDERS;
  constructor(public payload: OrderWineView) {
  }
}

export class FetchReceivedOrders implements Action {
  readonly type = FETCH_RECEIVED_ORDERS;
}

export class SetReceivedOrders implements Action {
  readonly type = SET_RECEIVED_ORDERS;
  constructor(public payload: OrderServiceDTO[]) {
  }
}

export class FetchSentOrders implements Action {
  readonly type = FETCH_SENT_ORDERS;
}

export class SetSentOrders implements Action {
  readonly type = SET_SENT_ORDERS;
  constructor(public payload: OrderServiceDTO[]) {
  }
}

export class SetReceiverAddressStart implements Action {
  readonly type = SET_RECEIVER_ADDRESS;
  constructor(public payload: AddressUserBindingDTO) {
  }
}

export class SendOrderStart implements Action {
  readonly type = SEND_ORDER_START;
}

export class SendOrderSuccess implements Action {
  readonly type = SEND_ORDER_SUCCESS;
}

export type OrdersActions = AddWineToOrder | FetchReceivedOrders | SetReceivedOrders |
  FetchSentOrders | SetSentOrders | SetReceiverAddressStart | SendOrderStart | SendOrderSuccess;