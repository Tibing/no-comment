import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ViewComments } from '../model';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {

  @Input() comments: ViewComments | null = [];

  get color(): string {
    return possibleColors[Math.floor(Math.random() * possibleColors.length)];
  }
}
