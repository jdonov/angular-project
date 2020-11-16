import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {WineryServiceDTO} from '../winery.model';
import {Observable, of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import * as AllWineriesActions from '../store/wineries.actions';

@Injectable({ providedIn: 'root' })
export class AllWineriesResolverService implements Resolve<WineryServiceDTO[]>{
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WineryServiceDTO[]> | Promise<WineryServiceDTO[]> | WineryServiceDTO[] {
    return this.store.select('allWineries').pipe(
      take(1),
      map(wineriesState => {
        return wineriesState.wineries;
      }),
      switchMap(wineries => {
        if (wineries.length === 0) {
          this.store.dispatch(new AllWineriesActions.FetchWineries());
          return this.actions$.pipe(
            ofType(AllWineriesActions.SET_WINERIES),
            take(1)
          );
        } else {
          return of(wineries);
        }
      })
    );
  }


}
