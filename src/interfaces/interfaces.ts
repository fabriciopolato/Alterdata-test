export interface ITicket {
  id: number;
  subject: string;
  message: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IComment {
  id: number;
  message: string;
  user_id: number;
  ticket_id: number;
  created_at: Date;
  deleted_at: Date;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
