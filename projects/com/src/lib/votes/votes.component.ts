import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ViewComment } from '../model';
import { CommentsState } from '../comments.state';

@Component({
  selector: 'lib-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesComponent {

  @Input() comment!: ViewComment;

  constructor(private commentesState: CommentsState) {
  }

  upvote(): void {
    this.commentesState.upvote(this.comment.id);
  }

  downvote(): void {
    this.commentesState.downvote(this.comment.id);
  }
}
