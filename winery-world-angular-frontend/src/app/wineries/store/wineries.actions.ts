import {Action} from '@ngrx/store';
import {WineryDetailsServiceDTO, WineryRegisterBindingDTO, WineryServiceDTO} from '../winery.model';

export const FETCH_WINERIES = '[Wineries] Fetch Wineries';
export const SET_WINERIES = '[Wineries] Set Wineries';
export const ADD_WINERY = '[Wineries] Add Winery';
export const FETCH_WINERY = '[Wineries] Fetch Winery';
export const SET_WINERY = '[Wineries] SET Winery';

export class FetchWineries implements Action {
  readonly type = FETCH_WINERIES;
}

export class SetWineries implements Action {
  readonly type = SET_WINERIES;
  constructor(public payload: WineryServiceDTO[]) {
  }
}

export class FetchWinery implements Action {
  readonly type = FETCH_WINERY;
  constructor(public payload: {id: string}) {
  }
}

export class SetWinery implements Action {
  readonly type = SET_WINERY;
  constructor(public payload: WineryDetailsServiceDTO) {
  }
}

export class AddWinery implements Action {
  readonly type = ADD_WINERY;
  constructor(public payload: WineryRegisterBindingDTO) {
  }
}

export type WineriesActions = FetchWineries | SetWineries | AddWinery | FetchWinery | SetWinery;
