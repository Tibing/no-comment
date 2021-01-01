import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { CommentsState } from '../comments.state';
import { ViewComment } from '../model';
import { User } from '../data-source/data-source';

@Component({
  selector: 'lib-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnDestroy {

  @ViewChild('textarea', { read: ElementRef }) textarea!: ElementRef;

  @Input() set viewComment(viewComment: ViewComment) {
    this.viewComment$.next(viewComment);
  }

  formGroup: FormGroup = new FormGroup({ content: new FormControl() });

  showTextarea$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showReply$: Observable<boolean> = this.showTextarea$.pipe(
    map((showTextarea: boolean) => !showTextarea),
  );

  showSubmit$: Observable<boolean> = combineLatest([
    this.showTextarea$,
    this.content$.pipe(startWith('')),
  ]).pipe(
    map(([showTextarea, content]: [boolean, string]) => showTextarea && !!content),
  );

  showCancel$: Observable<boolean> = combineLatest([
    this.showTextarea$,
    this.content$.pipe(startWith('')),
  ]).pipe(
    map(([showTextarea, content]: [boolean, string]) => showTextarea && !content),
  );

  viewComment$: BehaviorSubject<ViewComment | null> = new BehaviorSubject<ViewComment | null>(null);
  loggedIn$: Observable<boolean> = this.commentsState.user$.pipe(
    map((user: User | null) => !user?.isAnonymous),
  );

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private commentsState: CommentsState) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  showTextarea(): void {
    this.showTextarea$.next(true);
    this.textarea.nativeElement.focus();
  }

  submit(formData: { content: string }): void {
    this.showTextarea$.next(false);
    this.commentsState.addComment(formData.content, this.viewComment$.value?.id);
    this.content.patchValue('');
  }

  async submitAnonymously(): Promise<void> {
    await this.commentsState.loginAnon();
    this.submit(this.formGroup.value);
  }

  async loginAndSubmit(): Promise<void> {
    await this.commentsState.loginGoogle();
    this.submit(this.formGroup.value);
  }

  get content$(): Observable<string> {
    return this.content.valueChanges;
  }

  enterSubmit(): void {
    this.loggedIn$.pipe(
      take(1),
    ).subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.submit(this.formGroup.value);
      } else {
        this.loginAndSubmit();
      }
    });
  }

  private get content(): AbstractControl {
    return this.formGroup.get('content')!;
  }
}
