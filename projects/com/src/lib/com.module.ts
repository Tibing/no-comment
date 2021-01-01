import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ComComponent } from './com.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { VotesComponent } from './votes/votes.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { defaultIdSelectorProvider } from './location-selector';
import { DataSource } from './data-source/data-source';
import { FirebaseDatasource } from './data-source/firebase.datasource';
import { CommentsState } from './comments.state';


@NgModule({
  declarations: [ComComponent, CommentComponent, CommentsComponent, VotesComponent, CommentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [ComComponent],
  providers: [
    defaultIdSelectorProvider,
    CommentsState,
    { provide: DataSource, useClass: FirebaseDatasource },
  ],
})
export class ComModule {
}
