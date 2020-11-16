import {CommentServiceDTO} from '../commentServiceDTO';
import * as CommentActions from './comments.actions';

export interface State {
  comments: CommentServiceDTO[];
}

const initialState: State = {
  comments: [
    {
      id: 'ID-1',
      comment: 'User 1 comment',
      wineryId: '',
      username: 'test1',
      replies: [
        {
          id: '',
          parentId: '',
          username: 'test2',
          comment: 'Good comment',
          commentDateTime: new Date()
        },
        {
          id: '',
          parentId: '',
          username: 'test3',
          comment: 'Very good comment',
          commentDateTime: new Date()
        }
      ],
      commentDateTime: new Date()
    },
    {
      id: 'ID-2',
      wineryId: '',
      username: 'test2',
      comment: 'User 2 comment',
      replies: [
        {
          id: '',
          parentId: '',
          username: 'test3',
          comment: 'Excellent comment',
          commentDateTime: new Date()
        }
      ],
      commentDateTime: new Date()
    }
]
};

export function CommentsReducer(state: State = initialState, action: CommentActions.CommentsActions): State {
  switch (action.type) {
    case CommentActions.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    default:
      return state;
  }
}
