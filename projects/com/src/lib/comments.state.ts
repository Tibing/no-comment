import { Observable } from 'rxjs';
import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AngularFirestore, DocumentChangeAction, ENABLE_PERSISTENCE, PERSISTENCE_SETTINGS, SETTINGS } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, FirebaseAppConfig, FirebaseOptions } from '@angular/fire';
import { PersistenceSettings, Settings } from '@angular/fire/firestore/interfaces';

import { Comment, Comments, ViewComments } from './model';
import { LocationSelector, Selector } from './location-selector';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import User = firebase.User;

@Injectable()
export class CommentsState extends AngularFirestore {

  private commentsCache: Set<string> = new Set<string>();
  private readonly col: AngularFirestoreCollection<Comment> = this.collection(
    'comments',
    ref => ref.where('location', '==', this.select()),
  );
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
    shareReplay(),
  );

  readonly comments$: Observable<ViewComments> = this.values$
    .pipe(
      map((comments: Comments) => {
        const viewComments: ViewComments = this.createViewModel(comments);
        this.initialLoadDone = true;
        this.updateCache(comments);
        return viewComments;
      }),
      shareReplay(),
    );

  initialLoadDone = false;

  constructor(@Inject(LocationSelector) private select: Selector,
              @Inject(FIREBASE_OPTIONS) options: FirebaseOptions,
              @Optional() @Inject(FIREBASE_APP_NAME) nameOrConfig: string | FirebaseAppConfig | null | undefined,
              @Optional() @Inject(ENABLE_PERSISTENCE) shouldEnablePersistence: boolean | null,
              @Optional() @Inject(SETTINGS) settings: Settings | null,
              // tslint:disable-next-line:ban-types
              @Inject(PLATFORM_ID) platformId: Object,
              zone: NgZone,
              @Optional() @Inject(PERSISTENCE_SETTINGS) persistenceSettings: PersistenceSettings | null,
              private fauth: AngularFireAuth) {
    super(options, nameOrConfig, shouldEnablePersistence, settings, platformId, zone, persistenceSettings);
  }

  setVotes(commentId: string, votes: number): void {
    this.col
      .doc(commentId)
      .set({ votes }, { merge: true });
  }

  addComment(content: string, parentCommentId: string = ''): void {
    (this.fauth.user as Observable<User>)
      .pipe(
        take(1),
        tap((user: User) => {
          this.col
            .add({
              id: uuid(),
              createdAt: new Date(),
              parentCommentId,
              userName: user.displayName ?? 'Anonymous',
              votes: 0,
              content,
              head: user.photoURL ?? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcy8+PHBhdGggZD0iTTUxMiAyNTZhMjU2IDI1NiAwIDEwLTUxMyAxIDI1NiAyNTYgMCAwMDUxMy0xem0tNDk1IDBhMjM5IDIzOSAwIDExMzY3IDIwMnYtNDhjMC00Ni0yNC04OC02NC0xMTEtMi0yLTYtMS05IDAtMzMgMjItNzcgMjItMTEwIDAtMy0xLTctMi05IDAtNDAgMjMtNjQgNjUtNjQgMTExdjQ4QTIzOSAyMzkgMCAwMTE3IDI1NnptMTI4IDIxMnYtNThjMC0zOCAxOS03MyA1MS05NCAzNiAyMiA4NCAyMiAxMjAgMCAzMiAyMSA1MSA1NiA1MSA5NHY1OGEyMzcgMjM3IDAgMDEtMjIyIDB6Ii8+PHBhdGggZD0iTTI1NiAyODJhODUgODUgMCAxMDAtMTcxIDg1IDg1IDAgMDAwIDE3MXptMC0xNTRhNjggNjggMCAxMTAgMTM3IDY4IDY4IDAgMDEwLTEzN3oiLz48L3N2Zz4NCg==',
              location: this.select(),
              userId: user.uid,
            });
        }),
      )
      .subscribe();
  }

  removeComment(commentId: string): void {
    this.values$
      .pipe(
        take(1),
        tap((comments: Comments) => {
          this.col.doc(commentId).delete();
          this.removeTree(comments, commentId);
        }),
      )
      .subscribe();
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
      const justAdded: boolean = !this.commentsCache.has(comment.id) && this.initialLoadDone;
      viewComments.push({ id: comment.id, children, justAdded });
    }

    return viewComments;
  }

  private removeTree(comments: Comments, parentId: string = ''): ViewComments {
    const viewComments: ViewComments = [];
    const currentLevelComments: Comments = comments.filter((comment: Comment) => comment.parentCommentId === parentId);

    for (const comment of currentLevelComments) {
      this.col.doc(comment.id).delete();
    }

    return viewComments;
  }

  private updateCache(comments: Comments): void {
    this.commentsCache = new Set(comments.map((comment: Comment) => comment.id));
  }
}
