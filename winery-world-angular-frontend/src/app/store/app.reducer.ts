import * as fromWineries from '../wineries/all-wineries/store/all-wineries.reducer';
import * as fromWinery from '../wineries/winery/store/winery.reducer'
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  allWineries: fromWineries.State;
  winery: fromWinery.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  allWineries: fromWineries.allWineriesReducer,
  winery: fromWinery.wineryReducer
};
