import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';

import { Comment, Comments, ViewComments } from './model';

@Injectable()
export class CommentsState extends AngularFirestore {

  private readonly col: AngularFirestoreCollection<Comment> = this.collection('comments');
  private readonly snapshotChanges$: Observable<DocumentChangeAction<Comment>[]> = this.col.snapshotChanges();
  private readonly values$: Observable<Comments> = this.snapshotChanges$.pipe(
    map((documents: DocumentChangeAction<Comment>[]) => {
      return documents.map((document: DocumentChangeAction<Comment>) => {
        const data: Comment & { createdAt: { seconds: number } } = document.payload.doc.data() as never;
        return {
          ...data,
          id: document.payload.doc.id,
          createdAt: new Date(data.createdAt.seconds * 1000),
        };
      });
    }),
  );

  readonly comments$: Observable<ViewComments> = this.values$
    .pipe(
      map((comments: Comments) => this.createViewModel(comments)),
    );

  setVotes(commentId: string, votes: number): void {
    this.col
      .doc(commentId)
      .set({ votes }, { merge: true });
  }

  addComment(content: string, parentCommentId: string = ''): Observable<string> {
    return from(
      this.col
        .add({
          id: uuid(),
          createdAt: new Date(),
          parentCommentId,
          userName: 'Nikita Poltoratsky',
          votes: 0,
          content,
          head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        })
    )
      .pipe(
        map((doc: DocumentReference) => doc.id),
      );
  }

  byId(commentId: string): Observable<Comment> {
    return this.values$
      .pipe(
        map((comments: Comments) => {
          return comments.find((c: Comment) => c.id === commentId)!;
        }),
      );
  }

  private createViewModel(comments: Comments, parentId: string = ''): ViewComments {
    const viewComments: ViewComments = [];
    const currentLevelComments: Comments = comments
      .filter((comment: Comment) => comment.parentCommentId === parentId)
      .sort((a: Comment, b: Comment) => a.createdAt.getTime() - b.createdAt.getTime());

    for (const comment of currentLevelComments) {
      const children: ViewComments = this.createViewModel(comments, comment.id);
      viewComments.push({ id: comment.id, children });
    }

    return viewComments;
  }
}
