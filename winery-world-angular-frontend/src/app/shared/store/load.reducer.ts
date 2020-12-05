import * as AuthActions from '../../auth/store/auth.actions';
import * as WineryActions from '../../wineries/store/wineries.actions';
import * as CommentActions from '../../comments/store/comments.actions';
import * as MyOrdersActions from '../../my-orders/store/my-orders.actions';


export interface State {
  loading: boolean;
  loadChild: boolean;
};

const initialState: State = {
  loading: false,
  loadChild: false
};

export function loadReducer(
  state = initialState,
  action: AuthActions.AuthActions | WineryActions.WineriesActions | CommentActions.CommentsActions | MyOrdersActions.OrdersActions): State {
  switch (action.type){
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
    case WineryActions.FETCH_WINERIES:
    case WineryActions.FETCH_WINERY:
    case MyOrdersActions.FETCH_SENT_ORDERS:
    case MyOrdersActions.FETCH_RECEIVED_ORDERS:
      return {...state,
        loading: true
      };
    case CommentActions.FETCH_COMMENTS:
      return {...state,
        loadChild: true
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
    case AuthActions.AUTHENTICATE_FAIL:
    case WineryActions.SET_WINERIES:
    case WineryActions.SET_WINERY:
    case WineryActions.ADD_WINERY_SUCCESS:
    case WineryActions.EDIT_WINERY_SUCCESS:
    case WineryActions.EDIT_WINERY_ADD_WINE_SUCCESS:
    case WineryActions.RATE_UPDATE_WINE_SUCCESS:
    case WineryActions.DELETE_WINE_SUCCESS:
    case WineryActions.WINERY_ERROR:
    case CommentActions.SET_COMMENTS:
    case CommentActions.ADD_COMMENT_SUCCESS:
    case CommentActions.REPLY_TO_COMMENT_SUCCESS:
    case MyOrdersActions.SET_RECEIVED_ORDERS:
    case MyOrdersActions.SET_SENT_ORDERS:
    case MyOrdersActions.SEND_ORDER_SUCCESS:
    case MyOrdersActions.CONFIRM_CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadChild: false
      };
    default :
      return {...state};
  }
}

