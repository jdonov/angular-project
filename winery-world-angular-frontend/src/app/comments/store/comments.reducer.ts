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
      const newComments = [...state.comments];
      newComments.push({...action.payload, replies: []});
      return {
        ...state,
        comments: [...newComments]
      };
    case AllCommentActions.RESET_COMMENTS:
      return {
        ...state,
        comments: null
      };
    case AllCommentActions.REPLY_TO_COMMENT_SUCCESS:
      const updatedComments: CommentServiceDTO[] = [...state.comments];
      let commentToUpdate: CommentServiceDTO = updatedComments.find(c => c.id === action.payload.parentId);
      const updatedCommentIndex = updatedComments.indexOf(commentToUpdate);
      const newReplies = [...commentToUpdate.replies];
      newReplies.unshift({...action.payload});
      commentToUpdate = {
        ...commentToUpdate,
        replies: [...newReplies]
      };
      updatedComments[updatedCommentIndex] = {...commentToUpdate};
      return {
        ...state,
        comments: [...updatedComments]
      };
    default:
      return state;
  }
}
