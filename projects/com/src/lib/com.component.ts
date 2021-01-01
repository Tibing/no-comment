import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CommentsState } from './comments.state';
import { ViewComments } from './model';

@Component({
  selector: 'lib-com',
  template: `
    <lib-comment-form></lib-comment-form>

    <lib-comments [comments]="comments$ | async"></lib-comments>

    <span *ngIf="loading$ | async">Loading...</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComComponent {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  comments$: Observable<ViewComments> = this.commentsState.comments$
    .pipe(
      tap(() => this.loading$.next(false)),
    );

  constructor(private commentsState: CommentsState) {
  }
}
