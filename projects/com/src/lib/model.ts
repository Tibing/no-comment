export interface Comment {
  id: string;
  userName: string;
  head: string;
  createdAt: Date;
  content: string;
  votes: number;
  location: string;
  userId: string;
  parentCommentId?: string;
}

export type Comments = Comment[];

export interface ViewComment {
  id: string;
  children: ViewComment[];
  justAdded: boolean;
}

export type ViewComments = ViewComment[];
