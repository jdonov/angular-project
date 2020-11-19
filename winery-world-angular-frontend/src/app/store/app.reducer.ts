import * as fromWineries from '../wineries/store/wineries.reducer';
import * as fromComments from '../comments/store/comments.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';
import {User} from '../auth/user.model';
import {WineryServiceDTO} from '../wineries/winery.model';

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

export const selectUser = (state: AppState) => state.auth.user;
export const selectAllWineries = (state: AppState) => state.allWineries.wineries;

export const selectMyWineries = createSelector(
  selectUser,
  selectAllWineries,
  (selectedUser: User, allWineries) => {
    if (selectedUser && allWineries) {
      return allWineries.filter((winery: WineryServiceDTO) => winery.owner === selectedUser.username);
    } else {
      return [];
    }
  }
);
