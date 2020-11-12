import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { CommentsState } from './comments.state';
import { ViewComments } from './model';

@Component({
  selector: 'lib-com',
  template: `
    <lib-comments [comments]="comments$ | async"></lib-comments>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComComponent {

  public comments$: Observable<ViewComments> = this.commentsState.comments$;

  constructor(private commentsState: CommentsState) {
    const id1: string = uuid();
    const id2: string = uuid();
    const id3: string = uuid();
    const id4: string = uuid();
    const id5: string = uuid();

    commentsState.next([
      {
        userName: 'Nikita Poltoratsky',
        createdAt: new Date(),
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        votes: 123,
        head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        id: id1,
      },
      {
        userName: 'Nikita Poltoratsky',
        createdAt: new Date(),
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        votes: 123,
        head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        id: id2,
        parentCommentId: id1,
      },
      {
        userName: 'Nikita Poltoratsky',
        createdAt: new Date(),
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        votes: 123,
        head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        id: id3,
        parentCommentId: id2,
      },
      {
        userName: 'Nikita Poltoratsky',
        createdAt: new Date(),
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        votes: 123,
        head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        id: id4,
      },
      {
        userName: 'Nikita Poltoratsky',
        createdAt: new Date(),
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        votes: 123,
        head: 'https://en.gravatar.com/userimage/151538585/142b66ddcb21c792305183e4bf715a8a.jpg?size=200',
        id: id5,
        parentCommentId: id4,
      },
    ]);
  }
}
