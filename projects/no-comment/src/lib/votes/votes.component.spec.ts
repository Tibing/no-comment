import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable } from 'rxjs';

import { VotesComponent } from './votes.component';
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

describe('VotesComponent', () => {
  let component: VotesComponent;
  let fixture: ComponentFixture<VotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotesComponent],
      providers: [{ provide: CommentsState, useClass: CommentsStateMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
