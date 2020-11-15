import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class ScrollerService extends BehaviorSubject<string> {

  scrollTo(id: string): void {
    this.next(id);
  }

  waitScrollRequest(id: string): Observable<string> {
    return this.asObservable()
      .pipe(
        filter((commentId: string) => commentId === id),
        take(1),
      );
  }
}
