import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, Observable } from 'rxjs';

import { CommentsComponent } from './comments.component';
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

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [CommentsComponent],
      providers: [{ provide: CommentsState, useClass: CommentsStateMock }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
