import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as WineriesActions from './wineries.actions';
import {switchMap, map} from 'rxjs/operators';
import {WineryDetailsServiceDTO, WineryServiceDTO} from '../winery.model';
import {environment} from '../../../environments/environment';
import {FetchWinery} from './wineries.actions';
import {WineRate, WineServiceDTO} from '../../wines/wine.model';

const END_POINT_GET_ALL_WINERIES = 'api/winery';
const END_POINT_GET_WINERY = 'api/winery/';
const END_POINT_RATE_WINE = 'api/wine/rate';

@Injectable()
export class WineriesEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchWineries = this.actions$.pipe(
    ofType(WineriesActions.FETCH_WINERIES),
    switchMap(() => {
      return this.http.get<WineryServiceDTO[]>(environment.apiURL + END_POINT_GET_ALL_WINERIES);
    }),
    map(wineries => {
      return new WineriesActions.SetWineries(wineries);
    })
  );

  @Effect()
  fetchWinery = this.actions$.pipe(
    ofType(WineriesActions.FETCH_WINERY),
    switchMap((action: FetchWinery) => {
      return this.http.get<WineryDetailsServiceDTO>(environment.apiURL + END_POINT_GET_WINERY + action.payload.id);
    }),
    map(winery => {
      return new WineriesActions.SetWinery(winery);
    })
  );

  @Effect()
  rateWine = this.actions$.pipe(
    ofType(WineriesActions.RATE_WINE_START),
    switchMap((action: any) => {
      // Initialize Params Object
      let params = new HttpParams();

      // Begin assigning parameters
      params = params.append('wineId', action.payload.wineId);
      params = params.append('rating', action.payload.rating);
      console.log(params);
      return this.http.get<WineServiceDTO>(environment.apiURL + END_POINT_RATE_WINE, {params: params});
    }),
    map(wine => {
      return new WineriesActions.RateWineSuccess({wine: wine});
    })
  );

}
