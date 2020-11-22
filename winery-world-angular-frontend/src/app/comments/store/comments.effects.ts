import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as AllCommentsActions from '../store/comments.actions';
import {map, switchMap} from 'rxjs/operators';
import {CommentReplyServiceDTO, CommentServiceDTO} from '../comment.model';
import {environment} from '../../../environments/environment';


const END_POINT_FETCH_COMMENTS = 'api/comment/';
const END_POINT_ADD_NEW_COMMENT = 'api/comment/register';
const END_POINT_REPLY_TO_COMMENT = 'api/comment/reply';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  fetchComments = this.actions$.pipe(
    ofType(AllCommentsActions.FETCH_COMMENTS),
    switchMap((action: any) => {
      return this.http.get<CommentServiceDTO[]>(environment.apiURL + END_POINT_FETCH_COMMENTS + action.payload.id);
    }),
    map(comments => new AllCommentsActions.SetComments(comments))
  );

  @Effect()
  addNewComment = this.actions$.pipe(
    ofType(AllCommentsActions.ADD_COMMENT_START),
    switchMap((action: any) => {
      return this.http.post<CommentServiceDTO>(environment.apiURL + END_POINT_ADD_NEW_COMMENT, action.payload);
    }),
    map(comment => new AllCommentsActions.AddCommentSuccess(comment))
  );

  @Effect()
  replyToComment = this.actions$.pipe(
    ofType(AllCommentsActions.REPLY_TO_COMMENT_START),
    switchMap((action: any) => {
      return this.http.post<CommentReplyServiceDTO>(environment.apiURL + END_POINT_REPLY_TO_COMMENT, action.payload);
    }),
    map(reply => new AllCommentsActions.ReplyToCommentSuccess(reply))
  );
}
