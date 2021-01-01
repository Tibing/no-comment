import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import FUser = firebase.User;
import auth = firebase.auth;

import { DataSource, User } from './data-source';
import { Comment, Comments } from '../model';
import { LocationSelector, Selector } from '../location-selector';

@Injectable()
export class FirebaseDatasource implements DataSource {

  readonly user$: Observable<User> = this.fauth.user.pipe(
    map((user: FUser | null) => {
      return { displayName: user?.displayName, uid: user?.uid, photoURL: user?.photoURL } as unknown as User;
    }),
  );

  private readonly col: AngularFirestoreCollection<Comment> = this.firestore.collection(
    'comments',
    ref => ref.where('location', '==', this.select()),
  );

  private readonly snapshotChanges$: Observable<DocumentChangeAction<Comment>[]> = this.col.snapshotChanges();

  readonly comments$: Observable<Comments> = this.snapshotChanges$.pipe(
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

  constructor(private firestore: AngularFirestore,
              private fauth: AngularFireAuth,
              @Inject(LocationSelector) private select: Selector) {
  }

  create(comment: Comment): void {
    this.col.add(comment);
  }

  delete(id: string): void {
    this.col.doc(id).delete();
  }

  update(comment: Partial<Comment>): void {
    this.col
      .doc(comment.id)
      .set(comment, { merge: true });
  }

  async loginAnon(): Promise<void> {
    await this.fauth.signInAnonymously();
  }

  async loginGoogle(): Promise<void> {
    await this.fauth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
