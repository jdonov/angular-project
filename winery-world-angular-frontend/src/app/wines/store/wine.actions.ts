import {Action} from '@ngrx/store';
import {WineRate} from '../wine.model';

export const RATE_WINE = '[Wine] Rate wine';

export class RateWine implements Action {
  readonly type = RATE_WINE;
  constructor(public payload: WineRate) {
  }
}

export type WineActions = RateWine;
