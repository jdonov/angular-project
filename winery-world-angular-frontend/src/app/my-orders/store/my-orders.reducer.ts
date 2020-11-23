import {AddressUserBindingDTO, OrderPlaceBindingDTO, OrderServiceDTO, OrderWineBindingDTO, OrderWineView} from '../my-orders.model';
import * as AllOrdersActions from './my-orders.actions';

export interface State {
  shoppingCart: OrderPlaceBindingDTO;
  receivedOrders: OrderServiceDTO[];
  sentOrders: OrderServiceDTO[];
}

const initialState: State = {
  shoppingCart: {
    orderedWines: [],
    receiverAddress: null
  },
  receivedOrders: null,
  sentOrders: null
};

export function ordersReducer(state: State = initialState, action: AllOrdersActions.OrdersActions): State {
  switch (action.type) {
    case AllOrdersActions.ADD_WINE_TO_ORDERS:
      const orderedWinesUpdated = [...state.shoppingCart.orderedWines];
      orderedWinesUpdated.push({...action.payload});
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          orderedWines: [...orderedWinesUpdated]
        }
      };
    case AllOrdersActions.SET_RECEIVED_ORDERS:
      return {
        ...state,
        receivedOrders: [...action.payload]
      };
    case AllOrdersActions.SET_SENT_ORDERS:
      return {
        ...state,
        sentOrders: [...action.payload]
      };
    case AllOrdersActions.SET_RECEIVER_ADDRESS:
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          receiverAddress: action.payload
        }
      };
    case AllOrdersActions.SEND_ORDER_SUCCESS:
      return {
        ...state,
        shoppingCart: {
          orderedWines: [],
          receiverAddress: null
        }
      };
    default:
      return {
        ...state
      };
  }
}
