import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AllCommentsActions from '../store/comments.actions';
import {map, switchMap} from 'rxjs/operators';
import {CommentServiceDTO} from '../comment.model';
import {environment} from '../../../environments/environment';


const END_POINT_FETCH_COMMENTS = 'api/comment/';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchComments = this.actions$.pipe(
    ofType(AllCommentsActions.FETCH_COMMENTS),
    switchMap((action: any) => {
      return this.http.get<CommentServiceDTO[]>(environment.apiURL + END_POINT_FETCH_COMMENTS + action.payload.id);
    }),
    map(comments => new AllCommentsActions.SetComments(comments))
  );
}
