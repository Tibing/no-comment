export interface Vote {
  userId: string;
  vote: 1 | -1;
}

export interface Comment {
  id: string;
  userName: string;
  head: string;
  createdAt: Date;
  content: string;
  votes: Vote[];
  location: string;
  userId: string;
  parentCommentId?: string;
}

export type Comments = Comment[];

export interface ViewComment extends Comment {
  children: ViewComment[];
  justAdded: boolean;
}

export type ViewComments = ViewComment[];

export function emptyComment(): ViewComment {
  return {
    id: '',
    userName: 'Anonymous',
    head: '',
    createdAt: new Date(),
    content: '',
    votes: [],
    location: '',
    userId: '',
    children: [],
    justAdded: false,
  };
}
