export interface CommentServiceDTO {
  id: string;
  comment: string;
  wineryId: string;
  username: string;
  replies: CommentReplyServiceDTO[];
  commentDateTime: Date;
}

export interface CommentReplyServiceDTO {
  id: string;
  parentId: string;
  comment: string;
  username: string;
  commentDateTime: Date;
}

export interface CommentBindingDTO {
  wineryId: string;
  comment: string;
}

export interface CommentReplyBindingDTO {
  parentId: string;
  reply: CommentBindingDTO;
}
