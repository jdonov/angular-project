import { OrderPlaceBindingDTO, OrderServiceDTO } from '../my-orders.model';
import * as AllOrdersActions from './my-orders.actions';
import * as AllAuthActions from '../../auth/store/auth.actions';

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

export function ordersReducer(state: State = initialState, action: AllOrdersActions.OrdersActions | AllAuthActions.AuthActions): State {
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
    case AllOrdersActions.EDIT_ORDER:
      let allWines = [...state.shoppingCart.orderedWines];
      allWines = allWines.filter(w => w.id !== action.payload);
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          orderedWines: [...allWines]
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
    case AllOrdersActions.CONFIRM_CANCEL_ORDER_SUCCESS:
      const receivedOrdersUpdated = [...state.receivedOrders];
      let updatedOrder = receivedOrdersUpdated.find(o => o.id === action.payload.id);
      const index = receivedOrdersUpdated.indexOf(updatedOrder);
      updatedOrder = {
        ...action.payload
      };
      receivedOrdersUpdated[index] = updatedOrder;
      return {
        ...state,
        receivedOrders: [...receivedOrdersUpdated]
      };
    case AllAuthActions.LOGOUT:
      return {
        ...state,
        ...initialState
      };
    default:
      return {
        ...state
      };
  }
}
