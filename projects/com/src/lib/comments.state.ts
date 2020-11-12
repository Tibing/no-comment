import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Comment, Comments, ViewComment, ViewComments } from './model';

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
            return { ...comment, votes: comment.votes + 1};
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
            return { ...comment, votes: comment.votes - 1};
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
          head: '',
        }
      ]
    );
  }

  private createViewModel(comments: Comments): ViewComments {
    const viewComments: ViewComments = [];

    for (const comment of comments) {
      if (!comment.parentCommentId) {
        viewComments.push({ ...comment, children: [] });
      } else {
        const parent: Comment = comments.find((c: Comment) => c.id === comment.parentCommentId)!;
        const alreadyAddedParent: ViewComment | undefined = viewComments.find((viewComment: ViewComment) => viewComment.id === parent.id);


        if (alreadyAddedParent) {
          alreadyAddedParent.children.push({ ...comment, children: [] });
        } else {
          viewComments.push({ ...parent, children: [{ ...comment, children: [] }] });
        }
      }
    }

    return viewComments;
  }
}
