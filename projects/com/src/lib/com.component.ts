import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CommentsState } from './comments.state';
import { ViewComments } from './model';
import { map, shareReplay } from 'rxjs/operators';
import { ScrollerService } from './scroller.service';

@Component({
  selector: 'lib-com',
  template: `
    <lib-comments
      *ngIf="commentsExist$ | async"
      [comments]="comments$ | async"
    ></lib-comments>

    <lib-comment-form *ngIf="!(commentsExist$ | async)"></lib-comment-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommentsState, ScrollerService],
})
export class ComComponent {

  comments$: Observable<ViewComments> = this.commentsState.comments$;
  commentsExist$: Observable<boolean> = this.comments$
    .pipe(
      map((comments: ViewComments) => !!comments?.length),
      shareReplay()
    );

  constructor(private commentsState: CommentsState) {
  }
}
