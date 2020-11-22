import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommentsComponent} from './comments.component';
import {CommentComponent} from './comment/comment.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent, CommentComponent],
  imports: [SharedModule, ReactiveFormsModule],
  exports: [CommentsComponent, CommentComponent]
})
export class CommentsModule{}
