import * as fromWineries from '../wineries/store/wineries.reducer';
import * as fromComments from '../comments/store/comments.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  allWineries: fromWineries.State;
  comments: fromComments.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  allWineries: fromWineries.wineriesReducer,
  comments: fromComments.CommentsReducer
};

