import { NgModule } from '@angular/core';
import { ComComponent } from './com.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CommonModule } from '@angular/common';
import { VotesComponent } from './votes/votes.component';


@NgModule({
  declarations: [ComComponent, CommentComponent, CommentsComponent, VotesComponent],
  imports: [
    CommonModule,
  ],
  exports: [ComComponent],
})
export class ComModule {
}
