import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Comment, Comments, ViewComments } from './model';

@Injectable({ providedIn: 'root' })
export class CommentsState extends BehaviorSubject<Comments> {

  readonly comments$: Observable<ViewComments> = this.asObservable()
    .pipe(
      map((comments: Comments) => this.createViewModel(comments)),
    );

  upvote(commentId: string): void {
    this.next(
      this.getValue()
        .map((comment: Comment) => {
          if (comment.id === commentId) {
            return { ...comment, votes: comment.votes + 1 };
          }

          return comment;
        }),
    );
  }

  downvote(commentId: string): void {
    this.next(
      this.getValue()
        .map((comment: Comment) => {
          if (comment.id === commentId) {
            return { ...comment, votes: comment.votes - 1 };
          }

          return comment;
        }),
    );
  }

  comment(parentCommentId: string, content: string): void {
    this.next(
      [
        ...this.getValue(),
        {
          id: uuid(),
          createdAt: new Date(),
          parentCommentId,
          userName: 'Nikita Poltoratsky',
          votes: 0,
          content,
          head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        },
      ],
    );
  }

  byId(commentId: string): Observable<Comment> {
    return this.asObservable()
      .pipe(
        map((comments: Comments) => {
          return comments.find((comment: Comment) => comment.id === commentId)!;
        }),
      );
  }

  private createViewModel(comments: Comments, parentId?: string): ViewComments {
    const viewComments: ViewComments = [];
    const currentLevelComments: Comments = comments
      .filter((comment: Comment) => comment.parentCommentId === parentId)
      .sort((a: Comment, b: Comment) => a.createdAt.getTime() - b.createdAt.getTime());

    for (const comment of currentLevelComments) {
      const children: ViewComments = this.createViewModel(comments, comment.id);
      viewComments.push({ ...comment, children });
    }

    return viewComments;
  }
}
