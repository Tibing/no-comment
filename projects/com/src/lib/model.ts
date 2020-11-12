export interface Comment {
  id: string;
  userName: string;
  head: string;
  createdAt: Date;
  content: string;
  votes: number;
  parentCommentId?: string;
}

export type Comments = Comment[];

export interface ViewComment {
  id: string;
  userName: string;
  head: string;
  createdAt: Date;
  content: string;
  votes: number;
  children: ViewComment[];
}

export type ViewComments = ViewComment[];
