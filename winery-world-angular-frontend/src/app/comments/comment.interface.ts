export interface Reply {
  username: string;
  reply: string;
}

export interface CommentInterface {
  id: string;
  username: string;
  comment: string;
  replies: Reply[];
}
