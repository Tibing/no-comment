import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Comment } from '../model';
import { CommentsState } from '../comments.state';

@Component({
  selector: 'lib-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotesComponent {

  @Input() comment!: Comment;

  constructor(private commentsState: CommentsState) {
  }

  upvote(): void {
    this.commentsState.upvote(this.comment.id);
  }

  downvote(): void {
    this.commentsState.downvote(this.comment.id);
  }
}
