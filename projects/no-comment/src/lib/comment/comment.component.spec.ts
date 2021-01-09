import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';

import { CommentComponent } from './comment.component';
import { CommentsState } from '../comments.state';
import { Comment, ViewComments } from '../model';


export class CommentsStateMock {
  readonly comments$: Observable<ViewComments> = EMPTY;

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

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent],
      providers: [{ provide: CommentsState, useClass: CommentsStateMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
