import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as WineriesActions from './wineries.actions';
import {switchMap, map, tap, withLatestFrom} from 'rxjs/operators';
import {WineryDetailsServiceDTO, WineryServiceDTO} from '../winery.model';
import {environment} from '../../../environments/environment';
import {AddWineryStart, FetchWinery} from './wineries.actions';
import {WineRate, WineServiceDTO} from '../../wines/wine.model';
import {Router} from '@angular/router';

const END_POINT_GET_ALL_WINERIES = 'api/winery';
const END_POINT_GET_WINERY = 'api/winery/';
const END_POINT_REGISTER_WINERY = 'api/winery/register';
const END_POINT_RATE_WINE = 'api/wine/rate';

@Injectable()
export class WineriesEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>, private router: Router) {
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
  registerWinery = this.actions$.pipe(
    ofType(WineriesActions.ADD_WINERY_START),
    switchMap((action: AddWineryStart) => {
      return this.http.post<WineryDetailsServiceDTO>(environment.apiURL + END_POINT_REGISTER_WINERY, action.payload);
    }),
    map(winery => new WineriesActions.AddWinerySuccess(winery)),
    // withLatestFrom(this.store.select(state => state.allWineries.winery)),
    tap(() => {
      this.router.navigate(['/my-wineries']);
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
