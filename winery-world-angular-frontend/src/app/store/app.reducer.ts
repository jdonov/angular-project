import * as fromWineries from '../wineries/store/winery.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  wineries: fromWineries.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  wineries: fromWineries.wineryReducer
}
