export class Ticket {
  subject: string;
  message: string;
  user_id: string;

  constructor({ message, subject, user_id }) {
    this.message = message;
    this.subject = subject;
    this.user_id = user_id;
  }
}
