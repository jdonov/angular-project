import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CommentInterface} from './comment.interface';
import {CommentService} from './comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  leaveComment = false;
  comments: CommentInterface[];
  commentForm: FormGroup;
  constructor(private commentsService: CommentService) { }

  ngOnInit(): void {
    this.comments = this.commentsService.getComments();
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
    this.commentsService.addComment(comment);
    this.leaveComment = false;
  }
}
