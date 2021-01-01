import { Observable } from 'rxjs';

import { Comment } from '../model';

export interface User {
  displayName: string | null;
  photoURL: string;
  uid: string;
  isAnonymous: boolean;
}

export abstract class DataSource {

  abstract readonly comments$: Observable<Comment[]>;
  abstract readonly user$: Observable<User>;

  abstract update(comment: Partial<Comment>): void;

  abstract create(comment: Comment): void;

  abstract delete(id: string): void;

  abstract loginAnon(): Promise<void>;

  abstract loginGoogle(): Promise<void>;
}
