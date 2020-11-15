import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import auth = firebase.auth;
import User = firebase.User;
import { AngularFireAuth } from '@angular/fire/auth';

import { CommentsState } from '../comments.state';
import { ViewComment } from '../model';

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
  loggedIn$: Observable<boolean> = this.fauth.user.pipe(
    map((user: User | null) => !!user),
  );

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private commentsState: CommentsState,
              private fauth: AngularFireAuth) {
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
    await this.fauth.signInAnonymously();
    this.submit(this.formGroup.value);
  }

  async loginAndSubmit(): Promise<void> {
    await this.fauth.signInWithPopup(new auth.GoogleAuthProvider());
    this.submit(this.formGroup.value);
  }

  get content$(): Observable<string> {
    return this.content.valueChanges;
  }

  private get content(): AbstractControl {
    return this.formGroup.get('content')!;
  }
}
