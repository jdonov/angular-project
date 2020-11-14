import {Action} from '@ngrx/store';
import {WineryModel} from '../../winery.model';

export const FETCH_WINERIES = '[Wineries] Fetch Wineries';
export const ADD_WINERY = '[Wineries] Add Winery';

export class FetchWineries implements Action {
  readonly type = FETCH_WINERIES;
}

export class AddWinery implements Action {
  readonly type = ADD_WINERY;
  constructor(public payload: WineryModel) {
  }
}

export type AllWineriesActions = FetchWineries | AddWinery;
