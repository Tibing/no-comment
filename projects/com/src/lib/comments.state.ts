import { combineLatest, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Comment, Comments, ViewComments } from './model';
import { DataSource, User } from './data-source/data-source';
import { LocationSelector, Selector } from './location-selector';

@Injectable()
export class CommentsState {

  initialLoadDone = false;

  readonly user$: Observable<User> = this.datasource.user$;

  readonly comments$: Observable<ViewComments> = this.datasource.comments$
    .pipe(
      map((comments: Comments) => {
        const viewComments: ViewComments = this.createViewModel(comments);
        this.initialLoadDone = true;
        this.updateCache(comments);
        return viewComments;
      }),
      shareReplay(),
    );

  private commentsCache: Set<string> = new Set<string>();

  constructor(private datasource: DataSource, @Inject(LocationSelector) private select: Selector) {
  }

  upvote(commentId: string): void {
    this.vote(commentId, 1);
  }

  downvote(commentId: string): void {
    this.vote(commentId, -1);
  }

  private vote(commentId: string, vote: 1 | -1): void {
    combineLatest([this.byId(commentId), this.user$])
      .pipe(
        take(1),
        tap(([comment, user]: [Comment, User]) => {
          this.datasource.update({
            id: commentId, votes: [
              ...comment.votes,
              { userId: user.uid, vote},
            ],
          });
        }),
      )
      .subscribe();
  }

  addComment(content: string, parentCommentId: string = ''): void {
    this.datasource.user$
      .pipe(
        take(1),
        tap((user: User) => {
          this.datasource.create({
            id: uuid(),
            createdAt: new Date(),
            parentCommentId,
            userName: user.displayName ?? 'Anonymous',
            votes: [],
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
    this.datasource.comments$
      .pipe(
        take(1),
        tap((comments: Comments) => {
          this.datasource.delete(commentId);
          this.removeTree(comments, commentId);
        }),
      )
      .subscribe();
  }

  byId(commentId: string): Observable<Comment> {
    return this.datasource.comments$
      .pipe(
        map((comments: Comments) => {
          return comments.find((c: Comment) => c.id === commentId)!;
        }),
      );
  }

  async loginAnon(): Promise<void> {
    return this.datasource.loginAnon();
  }

  async loginGoogle(): Promise<void> {
    return this.datasource.loginGoogle();
  }

  private createViewModel(comments: Comments, parentId: string = ''): ViewComments {
    const viewComments: ViewComments = [];
    const currentLevelComments: Comments = comments
      .filter((comment: Comment) => comment.parentCommentId === parentId)
      .sort((a: Comment, b: Comment) => a.createdAt.getTime() - b.createdAt.getTime());

    for (const comment of currentLevelComments) {
      const children: ViewComments = this.createViewModel(comments, comment.id);
      const justAdded: boolean = !this.commentsCache.has(comment.id) && this.initialLoadDone;
      viewComments.push({ ...comment, children, justAdded });
    }

    return viewComments;
  }

  private removeTree(comments: Comments, parentId: string = ''): ViewComments {
    const viewComments: ViewComments = [];
    const currentLevelComments: Comments = comments.filter((comment: Comment) => comment.parentCommentId === parentId);

    for (const comment of currentLevelComments) {
      this.datasource.delete(comment.id);
    }

    return viewComments;
  }

  private updateCache(comments: Comments): void {
    this.commentsCache = new Set(comments.map((comment: Comment) => comment.id));
  }
}
