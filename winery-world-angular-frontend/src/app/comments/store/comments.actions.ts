import {Action} from '@ngrx/store';
import {CommentBindingDTO, CommentReplyBindingDTO, CommentReplyServiceDTO, CommentServiceDTO} from '../comment.model';

export const FETCH_COMMENTS = '[Comments] Fetch comments';
export const SET_COMMENTS = '[Comments] Set comments';
export const RESET_COMMENTS = '[Comments] Reset comments';
export const ADD_COMMENT_SUCCESS = '[Comments] Add comment success';
export const ADD_COMMENT_START = '[Comments] Add comment start';
export const REPLY_TO_COMMENT_START = '[Comments] Reply to comment start';
export const REPLY_TO_COMMENT_SUCCESS = '[Comments] Reply to comment success';

export class FetchComments implements Action {
  readonly type = FETCH_COMMENTS;
  constructor(public payload: {id: string}) {
  }
}

export class SetComments implements Action {
  readonly type = SET_COMMENTS;
  constructor(public payload: CommentServiceDTO[]) {
  }
}

export class ResetComments implements Action {
  readonly type = RESET_COMMENTS;
}

export class AddCommentStart implements Action {
  readonly type = ADD_COMMENT_START;
  constructor(public payload: CommentBindingDTO) {
  }
}

export class AddCommentSuccess implements Action {
  readonly type = ADD_COMMENT_SUCCESS;
  constructor(public payload: CommentServiceDTO) {
  }
}

export class ReplyToCommentStart implements Action {
  readonly type = REPLY_TO_COMMENT_START;
  constructor(public payload: CommentReplyBindingDTO) {
  }
}

export class ReplyToCommentSuccess implements Action {
  readonly type = REPLY_TO_COMMENT_SUCCESS;
  constructor(public payload: CommentReplyServiceDTO) {
  }
}

export type CommentsActions = FetchComments | SetComments | ResetComments |
  AddCommentStart | AddCommentSuccess | ReplyToCommentStart | ReplyToCommentSuccess;
