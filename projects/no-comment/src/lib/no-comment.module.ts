import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NoCommentComponent } from './no-comment.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { VotesComponent } from './votes/votes.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { defaultIdSelectorProvider } from './location-selector';
import { DataSource } from './data-source/data-source';
import { FirebaseDatasource } from './data-source/firebase.datasource';
import { CommentsState } from './comments.state';


@NgModule({
  declarations: [NoCommentComponent, CommentComponent, CommentsComponent, VotesComponent, CommentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [NoCommentComponent],
  providers: [
    defaultIdSelectorProvider,
    CommentsState,
    { provide: DataSource, useClass: FirebaseDatasource },
  ],
})
export class NoCommentModule {
}
