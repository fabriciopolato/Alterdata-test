declare namespace Express {
  export interface Request {
    user: {
      id: number;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
    };
  }
}
