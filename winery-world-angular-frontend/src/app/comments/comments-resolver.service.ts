import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CommentServiceDTO} from './comment.model';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, take} from 'rxjs/operators';
import * as AllCommentsActions from './store/comments.actions';

@Injectable({providedIn: 'root'})
export class CommentsResolverService implements Resolve<CommentServiceDTO[]>{
  wineryId: string;
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CommentServiceDTO[]> | Promise<CommentServiceDTO[]> | CommentServiceDTO[] {
    this.wineryId = route.parent.paramMap.get('wineryId');
    return this.store.select(st => st.comments.comments).pipe(
      take(1),
      switchMap(comments => {
        if (!comments) {
          this.store.dispatch(new AllCommentsActions.FetchComments({id: this.wineryId}));
          return this.actions$.pipe(
            ofType(AllCommentsActions.SET_COMMENTS),
            take(1)
          );
        } else {
          return of(comments);
        }
        })
    );
  }

}
