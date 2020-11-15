import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ComComponent } from './com.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { VotesComponent } from './votes/votes.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { defaultIdSelectorProvider } from './location-selector';


@NgModule({
  declarations: [ComComponent, CommentComponent, CommentsComponent, VotesComponent, CommentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
  ],
  exports: [ComComponent],
  providers: [defaultIdSelectorProvider],
})
export class ComModule {
}
