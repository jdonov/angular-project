import {CommentServiceDTO} from '../comment.model';
import * as AllCommentActions from './comments.actions';

export interface State {
  comments: CommentServiceDTO[];
}

const initialState: State = {
  comments: null
};

export function commentsReducer(state: State = initialState, action: AllCommentActions.CommentsActions): State {
  switch (action.type) {
    case AllCommentActions.SET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload]
      };
    case AllCommentActions.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case AllCommentActions.RESET_COMMENTS:
      return {
        ...state,
        comments: null
      }
    default:
      return state;
  }
}
