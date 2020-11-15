import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComComponent } from './com.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { VotesComponent } from './votes/votes.component';


@NgModule({
  declarations: [ComComponent, CommentComponent, CommentsComponent, VotesComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
  ],
  exports: [ComComponent],
})
export class ComModule {
}
