import { IComment } from '@interfaces';

type CommentConstructor = Omit<IComment, 'id' | 'created_at' | 'deleted_at'>;

export class Comment {
  message: string;
  user_id: number;
  ticket_id: number;

  constructor(props: CommentConstructor) {
    Object.assign(this, props);
  }
}
