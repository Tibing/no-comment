import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CommentsState } from './comments.state';
import { ViewComments } from './model';
import { ScrollerService } from './scroller.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'lib-com',
  template: `
    <lib-comment-form></lib-comment-form>

    <lib-comments [comments]="comments$ | async"></lib-comments>

    <span *ngIf="loading$ | async">Loading...</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommentsState, ScrollerService],
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
