import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';

import { CommentFormComponent } from './comment-form.component';
import { CommentsState } from '../comments.state';
import { Comment, ViewComments } from '../model';
import { User } from '../data-source/data-source';

export class CommentsStateMock {
  readonly comments$: Observable<ViewComments> = EMPTY;
  readonly user$: Observable<User> = EMPTY;

  setVotes(commentId: string, votes: number): void {
  }

  addComment(content: string, parentCommentId: string = ''): void {
  }

  removeComment(commentId: string): void {
  }

  byId(commentId: string): Observable<Comment> {
    return EMPTY;
  }
}

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      providers: [{ provide: CommentsState, useClass: CommentsStateMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
