import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentReplyBindingDTO, CommentServiceDTO} from '../comment.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {ReplyToCommentStart} from '../store/comments.actions';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentServiceDTO;
  @Input() index: number;
  viewRep = false;
  leaveReply = false;
  replyForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      reply: new FormControl(null, Validators.required)
    });
  }

  viewReplies(): void {
    this.viewRep = !this.viewRep;
    this.leaveReply = false;
  }

  leaveReplyToggle(): void {
    this.viewRep = false;
    this.leaveReply = true;
  }

  onSubmit(): void {
    const reply: CommentReplyBindingDTO = {
      parentId: this.comment.id,
      reply: {
        comment: this.replyForm.get('reply').value,
        wineryId: this.comment.wineryId
      }
    };
    this.store.dispatch(new ReplyToCommentStart(reply));
    this.viewRep = false;
    this.leaveReply = false;
  }

  cancelReply(): void {
    this.replyForm.reset();
    this.leaveReply = false;
  }
}
