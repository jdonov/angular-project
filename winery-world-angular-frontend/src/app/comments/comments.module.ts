import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommentsComponent} from './comments.component';
import {CommentComponent} from './comment/comment.component';

@NgModule({
  declarations: [CommentsComponent, CommentComponent],
  imports: [SharedModule],
  exports: [CommentsComponent, CommentComponent]
})
export class CommentsModule{}
