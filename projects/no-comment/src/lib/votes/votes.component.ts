import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { Comment, emptyComment, Vote } from '../model';
import { CommentsState } from '../comments.state';
import { User } from '../data-source/data-source';

@Component({
  selector: 'nc-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesComponent implements OnInit, OnDestroy {

  @Input() set comment(comment: Comment) {
    this.comment$.next(comment);
  }

  comment$: BehaviorSubject<Comment> = new BehaviorSubject<Comment>(emptyComment());

  canVote$: Observable<boolean> = combineLatest([this.comment$, this.commentsState.user$]).pipe(
    filter(([comment, user]: [Comment, User]) => !!comment),
    map(([comment, user]: [Comment, User]) => comment.votes.every((vote: Vote) => vote.userId !== user.uid)),
    shareReplay(),
  );

  votesSum$: Observable<number> = this.comment$.pipe(
    filter((comment: Comment) => !!comment),
    map((comment: Comment) => comment.votes.reduce((sum: number, vote: Vote) => sum + vote.vote, 0)),
  );

  upvote$: Subject<void> = new Subject<void>();

  downvote$: Subject<void> = new Subject<void>();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private commentsState: CommentsState) {
  }

  ngOnInit(): void {
    this.upvote$
      .pipe(
        withLatestFrom(this.comment$),
        tap(([upvote, comment]: [void, Comment]) => this.commentsState.upvote(comment.id)),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.downvote$
      .pipe(
        withLatestFrom(this.comment$),
        tap(([upvote, comment]: [void, Comment]) => this.commentsState.downvote(comment.id)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
