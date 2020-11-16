import {WineryDetailsServiceDTO, WineryServiceDTO} from '../winery.model';
import * as AllWineryActions from './wineries.actions';


export interface State {
  wineries: WineryServiceDTO[];
  winery: WineryDetailsServiceDTO;
}

const initialState: State = {
  wineries: [],
  // winery: {id: undefined, address: null, description: '', imageUrl: '', name: '', wines: [], owner: ''}
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
    default:
      return state;
  }
}
