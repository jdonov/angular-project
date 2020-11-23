import {AddressUserBindingDTO, OrderPlaceBindingDTO, OrderWineBindingDTO, OrderWineView} from '../my-orders.model';
import * as AllOrdersActions from './my-orders.actions';

export interface State extends OrderPlaceBindingDTO{
  orderedWines: OrderWineView[];
  username: string;
  receiverAddress: AddressUserBindingDTO;
}

const initialState: OrderPlaceBindingDTO = {
    orderedWines: [],
    username: null,
    receiverAddress: null
};

export function ordersReducer(state: State = initialState, action: AllOrdersActions.OrdersActions): State {
  switch (action.type) {
    case AllOrdersActions.ADD_WINE_TO_ORDERS:
      const orderedWinesUpdated = [...state.orderedWines];
      orderedWinesUpdated.push({...action.payload});
      return {
        ...state,
        orderedWines: [...orderedWinesUpdated]
      };
    default:
      return {
        ...state
      };
  }
}
