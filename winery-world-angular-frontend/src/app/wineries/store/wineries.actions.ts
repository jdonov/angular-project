import {Action} from '@ngrx/store';
import {WineryDetailsServiceDTO, WineryEditBindingDTO, WineryRegisterBindingDTO, WineryServiceDTO} from '../winery.model';
import {WineRate, WineServiceDTO} from '../../wines/wine.model';

export const FETCH_WINERIES = '[Wineries] Fetch wineries';
export const SET_WINERIES = '[Wineries] Set wineries';
export const ADD_WINERY_START = '[Wineries] Add winery start';
export const ADD_WINERY_SUCCESS = '[Wineries] Add winery success';
export const FETCH_WINERY = '[Wineries] Fetch winery';
export const SET_WINERY = '[Wineries] Set winery';
export const RATE_WINE_START = '[Wineries] Rate wine start';
export const RATE_WINE_SUCCESS = '[Wineries] Rate wine success';
export const EDIT_WINERY_START = '[Wineries] Edit winery start';
export const EDIT_WINERY_SUCCESS = '[Wineries] Edit winery success';

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

export class AddWineryStart implements Action {
  readonly type = ADD_WINERY_START;
  constructor(public payload: WineryRegisterBindingDTO) {
  }
}

export class AddWinerySuccess implements Action {
  readonly type = ADD_WINERY_SUCCESS;
  constructor(public payload: WineryDetailsServiceDTO) {
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

export class EditWineryStart implements Action {
  readonly type = EDIT_WINERY_START;
  constructor(public payload: WineryEditBindingDTO) {
  }
}

export class EditWinerySuccess implements Action {
  readonly type = EDIT_WINERY_SUCCESS;
  constructor(public payload: WineryEditBindingDTO) {
  }
}

export type WineriesActions = FetchWineries | SetWineries | AddWineryStart | AddWinerySuccess |
  FetchWinery | SetWinery | RateWineStart | RateWineSuccess | EditWineryStart | EditWinerySuccess;
