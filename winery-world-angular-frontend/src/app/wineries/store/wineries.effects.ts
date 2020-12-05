import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AllWineriesActions from './wineries.actions';
import {switchMap, map, tap, catchError} from 'rxjs/operators';
import {WineryDetailsServiceDTO, WineryEditBindingDTO, WineryServiceDTO} from '../winery.model';
import {environment} from '../../../environments/environment';
import {AddWineryStart, FetchWinery, RateUpdateWineSuccess} from './wineries.actions';
import {WineServiceDTO} from '../../wines/wine.model';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {RegisterEditWineryService} from '../register-edit-winery/register-edit-winery.service';

const END_POINT_GET_ALL_WINERIES = 'api/winery';
const END_POINT_GET_WINERY = 'api/winery/';
const END_POINT_REGISTER_WINERY = 'api/winery/register';
const END_POINT_RATE_WINE = 'api/wine/rate';
const END_POINT_EDIT_WINERY = 'api/winery/edit/';
const END_POINT_EDIT_WINERY_ADD_WINE = 'api/wine/register';
const END_POINT_DELETE_WINE = 'api/wine/delete/';
const END_POINT_EDIT_WINE = 'api/wine/edit';

@Injectable()
export class WineriesEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private registerEditWineryService: RegisterEditWineryService) {
  }

  @Effect()
  fetchWineries = this.actions$.pipe(
    ofType(AllWineriesActions.FETCH_WINERIES),
    switchMap(() => {
      return this.http.get<WineryServiceDTO[]>(environment.apiURL + END_POINT_GET_ALL_WINERIES);
    }),
    map(wineries => {
      return new AllWineriesActions.SetWineries(wineries);
    })
  );

  @Effect()
  fetchWinery = this.actions$.pipe(
    ofType(AllWineriesActions.FETCH_WINERY),
    switchMap((action: FetchWinery) => {
      return this.http.get<WineryDetailsServiceDTO>(environment.apiURL + END_POINT_GET_WINERY + action.payload.id);
    }),
    map(winery => {
      return new AllWineriesActions.SetWinery(winery);
    })
  );

  @Effect()
  registerWinery = this.actions$.pipe(
    ofType(AllWineriesActions.ADD_WINERY_START),
    switchMap((action: AddWineryStart) => {
      return this.http.post<WineryDetailsServiceDTO>(environment.apiURL + END_POINT_REGISTER_WINERY, action.payload).pipe(
        map(winery => {
            return new AllWineriesActions.AddWinerySuccess(winery);
        }),
        tap((winery) => {
          this.registerEditWineryService.isSent.next(true);
          this.router.navigate(['/my-wineries'], {fragment: 'top'});
        }),
        catchError(errorRes => {
          return of(new AllWineriesActions.WineryError(errorRes.error.errors[0]));
        })
      );
    })
  );

  @Effect()
  rateWine = this.actions$.pipe(
    ofType(AllWineriesActions.RATE_WINE_START),
    switchMap((action: any) => {
      // Initialize Params Object
      let params = new HttpParams();

      // Begin assigning parameters
      params = params.append('wineId', action.payload.wineId);
      params = params.append('rating', action.payload.rating);
      return this.http.get<WineServiceDTO>(environment.apiURL + END_POINT_RATE_WINE, {params: params});
    }),
    map(wine => {
      return new AllWineriesActions.RateUpdateWineSuccess({wine: wine});
    })
  );

  @Effect()
  editWinery = this.actions$.pipe(
    ofType(AllWineriesActions.EDIT_WINERY_START),
    switchMap((action: any) => {
      const winery = {
        name: action.payload.name,
        imageUrl: action.payload.imageUrl,
        description: action.payload.description,
        address: action.payload.address
      };
      return this.http.patch<WineryEditBindingDTO>(environment.apiURL + END_POINT_EDIT_WINERY + action.payload.id, winery).pipe(
        map(responseWinery => {
          return new AllWineriesActions.EditWinerySuccess(responseWinery);
        }),
        tap(() => {
          this.registerEditWineryService.isSent.next(true);
        }),
        catchError(errorRes => {
          return of(new AllWineriesActions.WineryError(errorRes.error.errors[0]));
        })
      );
    })
  );

  @Effect()
  addNewWine = this.actions$.pipe(
    ofType(AllWineriesActions.EDIT_WINERY_ADD_WINE_START),
    switchMap((action: any) => {
      return this.http.post<WineServiceDTO>(environment.apiURL + END_POINT_EDIT_WINERY_ADD_WINE, action.payload);
    }),
    map(wine => new AllWineriesActions.WineRegisterSuccess(wine))
  );

  @Effect()
  deleteWine = this.actions$.pipe(
    ofType(AllWineriesActions.DELETE_WINE_START),
    switchMap((action: any) => {
      return this.http.delete<{id: string}>(environment.apiURL + END_POINT_DELETE_WINE + action.payload.id);
    }),
    map(id => new AllWineriesActions.WineDeleteSuccess(id))
  );

  @Effect()
  editWine = this.actions$.pipe(
    ofType(AllWineriesActions.EDIT_WINE_START),
    switchMap((action: any) => {
      return this.http.put<WineServiceDTO>(environment.apiURL + END_POINT_EDIT_WINE, action.payload);
    }),
    map(wine => new RateUpdateWineSuccess({wine}))
  );
}
