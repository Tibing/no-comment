import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Input } from '@angular/core';

import { Comment, ViewComments } from '../model';
import { commentsEnter } from './comments-enter.animation';

const possibleColors: string[] = [
  '#7C4DFF',
  '#F44336',
  '#FF4081',
  '#9C27B0',
  '#03A9F4',
  '#00BCD4',
  '#FFEB3B',
  '#4CAF50',
  '#FFC107',
  '#536DFE',
];

@Component({
  selector: 'lib-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  animations: [commentsEnter],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {

  @Input() comments: ViewComments | null = [];
  @Input() level = 0;

  get color(): string {
    return '#7C4DFF';
  }

  commentsTrackBy(index: number, comment: Comment): string {
    return comment.id;
  }
}
