import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { concatMap, delay, filter, shareReplay, switchMap, take, tap } from 'rxjs/operators';

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
  @Input() level = 0;

  viewComment$: BehaviorSubject<ViewComment> = new BehaviorSubject<ViewComment>(null!);

  comment$: Observable<Comment> = this.viewComment$
    .pipe(
      filter<ViewComment>(Boolean),
      switchMap((viewComment: ViewComment) => this.commentsState.byId(viewComment.id)),
      shareReplay(),
    );

  flash$: Observable<boolean> = this.viewComment$.pipe(
    filter((viewComment: ViewComment) => viewComment.justAdded),
    tap(() => {
      const position: number = this.findPos(this.elementRef.nativeElement);
      window.scroll(0, position);
    }),
    switchMap(() => from([true, false])),
    concatMap(x => of(x).pipe(delay(100)))
  );

  constructor(private commentsState: CommentsState,
              private elementRef: ElementRef) {
  }

  private findPos(el: HTMLElement): number {
    let curtop = 0;
    let e: HTMLElement | null = el;

    if (e.offsetParent) {
      do {
        curtop += e.offsetTop;
        e = e.offsetParent as never;
      } while (e);

      return curtop;
    }

    return 0;
  }
}

