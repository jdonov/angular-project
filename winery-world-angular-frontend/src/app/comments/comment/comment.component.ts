import {Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from '../comment.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentInterface;
  @Input() index: number;
  viewRep = false;
  leaveReply = false;
  replyForm: FormGroup;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      reply: new FormControl(null)
    });
  }

  viewReplies(): void {
    this.viewRep = !this.viewRep;
    this.leaveReply = false;
  }

  leaveReplyToggle(): void {
    this.viewRep = false;
    this.leaveReply = !this.leaveReply;
  }

  onSubmit(): void {

  }

  shareReply(): void {
    const reply = this.replyForm.get('reply').value;
    this.commentService.addReplyToComment(reply, this.comment.id);
    this.comment = this.commentService.getComment(this.comment.id);
    this.leaveReply = false;
    this.viewRep = true;
  }

}
