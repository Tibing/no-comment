import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ViewComment } from '../model';
import { CommentsState } from '../comments.state';

@Component({
  selector: 'lib-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {

  @Input() comment!: ViewComment;

  showReply = false;

  private content = '';

  constructor(private commentsState: CommentsState) {
  }

  submit(): void {
    this.commentsState.comment(this.comment.id, this.content);
  }

  setContent(content: string): void {
    this.content = content;
  }
}
