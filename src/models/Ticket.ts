export class Ticket {
  subject: string;
  message: string;
  user_id: number;

  constructor({ message, subject, user_id }: Ticket) {
    this.message = message;
    this.subject = subject;
    this.user_id = user_id;
  }
}
