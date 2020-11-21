import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as WineriesActions from './wineries.actions';
import {switchMap, map, tap, withLatestFrom} from 'rxjs/operators';
import {WineryDetailsServiceDTO, WineryEditBindingDTO, WineryServiceDTO} from '../winery.model';
import {environment} from '../../../environments/environment';
import {AddWineryStart, FetchWinery} from './wineries.actions';
import {WineServiceDTO} from '../../wines/wine.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterEditWineryService} from '../register-edit-winery/register-edit-winery.service';

const END_POINT_GET_ALL_WINERIES = 'api/winery';
const END_POINT_GET_WINERY = 'api/winery/';
const END_POINT_REGISTER_WINERY = 'api/winery/register';
const END_POINT_RATE_WINE = 'api/wine/rate';
const END_POINT_EDIT_WINERY = 'api/winery/edit/';
const END_POINT_EDIT_WINERY_ADD_WINE = 'api/wine/register';

@Injectable()
export class WineriesEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>,
              private router: Router, private registerEditWineryService: RegisterEditWineryService) {
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
      return this.http.get<WineServiceDTO>(environment.apiURL + END_POINT_RATE_WINE, {params: params});
    }),
    map(wine => {
      return new WineriesActions.RateWineSuccess({wine: wine});
    })
  );

  @Effect()
  editWinery = this.actions$.pipe(
    ofType(WineriesActions.EDIT_WINERY_START),
    switchMap((action: any) => {
      const winery = {
        name: action.payload.name,
        imageUrl: action.payload.imageUrl,
        description: action.payload.description,
        address: action.payload.address
      };
      return this.http.patch<WineryEditBindingDTO>(environment.apiURL + END_POINT_EDIT_WINERY + action.payload.id, winery);
    }),
    map(winery => new WineriesActions.EditWinerySuccess(winery))
  );

  @Effect()
  addNewWine = this.actions$.pipe(
    ofType(WineriesActions.EDIT_WINERY_ADD_WINE_START),
    switchMap((action: any) => {
      return this.http.post<WineServiceDTO>(environment.apiURL + END_POINT_EDIT_WINERY_ADD_WINE, action.payload);
    }),
    map(wine => new WineriesActions.WineRegisterSuccess(wine))
  );

}
