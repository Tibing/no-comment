import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { Comment, ViewComment } from '../model';
import { CommentsState } from '../comments.state';

@Component({
  selector: 'lib-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {

  @Input() set viewComment(viewComment: ViewComment) {
    this.viewComment$.next(viewComment);
  }

  showReply = false;
  viewComment$: BehaviorSubject<ViewComment> = new BehaviorSubject<ViewComment>(null!);
  comment$: Observable<Comment> = this.viewComment$
    .pipe(
      filter<ViewComment>(Boolean),
      switchMap((viewComment: ViewComment) => this.commentsState.byId(viewComment.id)),
      shareReplay(),
    );

  private content = '';

  constructor(private commentsState: CommentsState) {
  }

  submit(): void {
    this.commentsState.comment(this.viewComment$.value.id, this.content);
  }

  setContent(content: string): void {
    this.content = content;
  }
}
