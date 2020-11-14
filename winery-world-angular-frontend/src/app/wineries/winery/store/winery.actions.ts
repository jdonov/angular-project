import {Action} from '@ngrx/store';


export const FETCH_WINERY = '[Winery] Fetch Winery';

export class FetchWinery implements Action {
  readonly type = FETCH_WINERY;
}


export type WineryActions = FetchWinery;
