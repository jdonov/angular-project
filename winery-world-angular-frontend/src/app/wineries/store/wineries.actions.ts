import {Action} from '@ngrx/store';
import {WineryDetailsServiceDTO, WineryRegisterBindingDTO, WineryServiceDTO} from '../winery.model';
import {WineRate, WineServiceDTO} from '../../wines/wine.model';

export const FETCH_WINERIES = '[Wineries] Fetch Wineries';
export const SET_WINERIES = '[Wineries] Set Wineries';
export const ADD_WINERY = '[Wineries] Add Winery';
export const FETCH_WINERY = '[Wineries] Fetch Winery';
export const SET_WINERY = '[Wineries] Set Winery';
export const RATE_WINE_START = '[Wineries] Rate wine start';
export const RATE_WINE_SUCCESS = '[Wineries] Rate wine success';

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

export class RateWineStart implements Action {
  readonly type = RATE_WINE_START;
  constructor(public payload: WineRate) {
  }
}

export class RateWineSuccess implements Action {
  readonly type = RATE_WINE_SUCCESS;
  constructor(public payload: {wine: WineServiceDTO}) {
  }
}

export type WineriesActions = FetchWineries | SetWineries | AddWinery | FetchWinery | SetWinery | RateWineStart | RateWineSuccess;
