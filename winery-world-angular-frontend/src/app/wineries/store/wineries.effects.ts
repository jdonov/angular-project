import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as WineriesActions from './wineries.actions';
import {switchMap, map} from 'rxjs/operators';
import {WineryDetailsServiceDTO, WineryServiceDTO} from '../winery.model';
import {environment} from '../../../environments/environment';
import {FetchWinery} from './wineries.actions';

const END_POINT_GET_ALL_WINERIES = 'api/winery';
const END_POINT_GET_ALL_WINERY = 'api/winery/';

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

      return this.http.get<WineryDetailsServiceDTO>(environment.apiURL + END_POINT_GET_ALL_WINERY + action.payload.id);
    }),
    map(winery => {
      return new WineriesActions.SetWinery(winery);
    })
  );

}
