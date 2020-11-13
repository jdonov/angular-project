import {Injectable} from '@angular/core';
import {CommentInterface, Reply} from './comment.interface';

@Injectable({ providedIn: 'root' })
export class CommentService {
  comments: CommentInterface[] = [
    {
      id: 'ID-1',
      username: 'test1',
      comment: 'User 1 comment',
      replies: [
        {
          username: 'test2',
          reply: 'Good comment'
        },
        {
          username: 'test3',
          reply: 'Very good comment'
        }
      ]
    },
    {
      id: 'ID-2',
      username: 'test2',
      comment: 'User 2 comment',
      replies: [
        {
          username: 'test3',
          reply: 'Excellent comment'
        }
      ]
    }
  ];
  constructor() {
  }

  getComments(): CommentInterface[] {
    return this.comments;
  }

  addComment(comment: string): void {
    const newComment = {id: null, comment, username: 'testUserAngular', replies: []};
    this.comments.push(newComment);
  }

  addReplyToComment(reply: string, commentId: string): void {
    const comment = this.comments.find(c => c.id === commentId);
    // TODO get the logged in user
    comment.replies.push({reply, username: 'testUser5'});
  }

  getComment(id: string): CommentInterface {
    return this.comments.find(c => c.id === id);
  }

}
