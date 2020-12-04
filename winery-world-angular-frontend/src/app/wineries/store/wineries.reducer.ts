import {WineryDetailsServiceDTO, WineryServiceDTO} from '../winery.model';
import * as AllWineryActions from './wineries.actions';


export interface State {
  wineries: WineryServiceDTO[];
  winery: WineryDetailsServiceDTO;
  wineryError: string;
}

const initialState: State = {
  wineries: [],
  winery: null,
  wineryError: null
};


export function wineriesReducer(state: State = initialState, action: AllWineryActions.WineriesActions): any {
  switch (action.type) {
    case AllWineryActions.ADD_WINERY_START:
    case AllWineryActions.EDIT_WINERY_START:
    case AllWineryActions.RATE_WINE_START:
    case AllWineryActions.DELETE_WINE_START:
    case AllWineryActions.EDIT_WINERY_ADD_WINE_START:
    case AllWineryActions.EDIT_WINE_START:
    case AllWineryActions.WINERY_CLEAR_ERROR:
      return {
        ...state,
        wineryError: null
      };
    case AllWineryActions.WINERY_ERROR:
      return {
        ...state,
        wineryError: action.payload
      };
    case AllWineryActions.SET_WINERIES:
      return {
        ...state,
        wineries: [...action.payload]
      };
    case AllWineryActions.ADD_WINERY_SUCCESS:
      const wineryService: WineryServiceDTO = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        imageUrl: action.payload.imageUrl,
        owner: action.payload.owner
      };
      const updatedWineries = [...state.wineries, wineryService];
      const newWinery = {...action.payload};
      return {
        ...state,
        wineries: updatedWineries,
        winery: newWinery,
        wineryError: null
      };
    case AllWineryActions.SET_WINERY:
      return {
        ...state,
        winery: action.payload
      };
    case AllWineryActions.EDIT_WINERY_SUCCESS:
      const editedWinery = {...state.winery, ...action.payload};
      const editedWineries = [...state.wineries];
      const wineryToEdit = editedWineries.find(w => w.id === editedWinery.id);
      const i = editedWineries.indexOf(wineryToEdit);
      editedWineries[i] = editedWinery;

      return {
        ...state,
        wineries: [...editedWineries],
        winery: {...editedWinery},
        wineryError: null
      };

    case AllWineryActions.EDIT_WINERY_ADD_WINE_SUCCESS:
      const wineryWines = [...state.winery.wines];
      wineryWines.push({...action.payload});
      const wineryWithNewWine: WineryDetailsServiceDTO = {
        ...state.winery,
        wines: wineryWines
      };
      return {
        ...state,
        winery: wineryWithNewWine,
        wineryError: null
      };

    case AllWineryActions.RATE_UPDATE_WINE_SUCCESS:
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
        wines: [...updatedWines]
      };

      return {
        ...state,
        winery: {...updatedWinery},
        wineryError: null
      };
    case AllWineryActions.DELETE_WINE_SUCCESS:
      const winesCollToDelete = [...state.winery.wines.filter(w => w.id !== action.payload.id)];
      const updatedWineryDelWine = {
        ...state.winery,
        wines: [...winesCollToDelete]
      };
      return {
        ...state,
        winery: {...updatedWineryDelWine},
        wineryError: null
      };
    default:
      return state;
  }
}
