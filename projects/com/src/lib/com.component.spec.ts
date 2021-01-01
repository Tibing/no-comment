import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';

import { ComComponent } from './com.component';
import { CommentsState } from './comments.state';
import { Comment, ViewComments } from './model';

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

describe('ComComponent', () => {
  let component: ComComponent;
  let fixture: ComponentFixture<ComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComComponent],
      providers: [{ provide: CommentsState, useClass: CommentsStateMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
