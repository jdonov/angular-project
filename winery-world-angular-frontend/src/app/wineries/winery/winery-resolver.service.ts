import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WineryDetailsServiceDTO} from '../winery.model';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import * as AllWineriesActions from '../store/wineries.actions';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class WineryResolverService implements Resolve<WineryDetailsServiceDTO> {
  wineryId: string;
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WineryDetailsServiceDTO> | Promise<WineryDetailsServiceDTO> | WineryDetailsServiceDTO {
    this.wineryId = route.paramMap.get('wineryId');
    return this.store.select('allWineries').pipe(
      take(1),
      map(wineriesState => {
        return wineriesState.winery;
      }),
      switchMap(winery => {
        if (!winery || winery.id !== this.wineryId) {
          this.store.dispatch(new AllWineriesActions.FetchWinery({id: this.wineryId}));
          return this.actions$.pipe(
            ofType(AllWineriesActions.SET_WINERY),
            take(1)
          );
        } else {
          return of(winery);
        }
      })
    );
  }
}
