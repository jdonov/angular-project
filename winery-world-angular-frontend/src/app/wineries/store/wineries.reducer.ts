import {WineryDetailsServiceDTO, WineryServiceDTO} from '../winery.model';
import * as AllWineryActions from './wineries.actions';


export interface State {
  wineries: WineryServiceDTO[];
  winery: WineryDetailsServiceDTO;
}

const initialState: State = {
  wineries: [],
  winery: null
};


export function wineriesReducer(state: State = initialState, action: AllWineryActions.WineriesActions): any {
  switch (action.type) {
    case AllWineryActions.SET_WINERIES:
      return {
        ...state,
        wineries: [...action.payload]
      };
    case AllWineryActions.ADD_WINERY:
      return {
        ...state,
        wineries: [...state.wineries, action.payload]
      };
    case AllWineryActions.SET_WINERY:
      return {
        ...state,
        winery: action.payload
      };
    case AllWineryActions.RATE_WINE_SUCCESS:
      const wineToUpdate = state.winery.wines.find(w => w.id === action.payload.wine.id);
      const wineToUpdateIndex = state.winery.wines.indexOf(wineToUpdate);
      const updatedWine = {
        ...state.winery.wines[wineToUpdateIndex],
        ...action.payload.wine
      };
      const updatedWines = [...state.winery.wines];
      updatedWines[wineToUpdateIndex] = updatedWine;
      const updatedWinery = {
        ...state.winery,
        wines: updatedWines
      };

      return {
        ...state,
        winery: updatedWinery
      };
    default:
      return state;
  }
}
