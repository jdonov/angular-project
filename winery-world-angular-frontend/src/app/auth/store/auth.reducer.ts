import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const user = {
  id: '123', username: 'test2@test.com', token: 'someToken', tokenExpirationDate: new Date()
};

const initialState: State = {
  user: new User(user.id, user.username, user.token, user.tokenExpirationDate),
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      // tslint:disable-next-line:no-shadowed-variable
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
