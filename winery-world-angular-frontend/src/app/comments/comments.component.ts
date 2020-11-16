import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentInterface} from './comment.interface';
import {CommentService} from './comment.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Observable} from 'rxjs';
import {CommentServiceDTO} from './commentServiceDTO';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  leaveComment = false;
  // comments: CommentInterface[];
  comments: Observable<{ comments: CommentServiceDTO[]}>;
  commentForm: FormGroup;
  // constructor(private commentsService: CommentService) { }
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    // this.comments = this.commentsService.getComments();
    this.comments = this.store.select('comments');
    this.commentForm = new FormGroup({
      comment: new FormControl(null)
    });
  }

  onSubmit(): void {

  }

  leaveCommentToggle(): void {
    this.leaveComment = !this.leaveComment;
  }

  shareComment(): void {
    const comment = this.commentForm.get('comment').value;
    // this.commentsService.addComment(comment);
    this.leaveComment = false;
  }
}
