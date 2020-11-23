import {Action} from '@ngrx/store';
import {OrderWineView} from '../my-orders.model';

export const ADD_WINE_TO_ORDERS = '[Orders] Add new wine to order';

export class AddWineToOrder implements Action {
  readonly type = ADD_WINE_TO_ORDERS;
  constructor(public payload: OrderWineView) {
  }
}

export type OrdersActions = AddWineToOrder;
