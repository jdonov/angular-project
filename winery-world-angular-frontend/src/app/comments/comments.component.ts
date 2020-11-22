import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Observable} from 'rxjs';
import {CommentBindingDTO, CommentServiceDTO} from './comment.model';
import {ActivatedRoute, Params} from '@angular/router';
import {AddCommentStart} from './store/comments.actions';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  leaveComment = false;
  comments: Observable<{ comments: CommentServiceDTO[]}>;
  commentForm: FormGroup;
  wineryId: string;
  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.comments = this.store.select('comments');
    this.commentForm = new FormGroup({
      comment: new FormControl(null)
    });
    this.route.parent.params.subscribe((params: Params) => {
      this.wineryId = params.wineryId;
    });
  }

  onSubmit(): void {
    const comment: CommentBindingDTO = {
      ...this.commentForm.value,
      wineryId: this.wineryId
    };
    this.store.dispatch(new AddCommentStart(comment));
    this.leaveComment = false;
  }

  leaveCommentToggle(): void {
    this.leaveComment = !this.leaveComment;
  }

  cancelComment(): void {
    this.commentForm.reset();
    this.leaveComment = false;
  }
}
