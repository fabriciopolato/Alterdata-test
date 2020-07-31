import { ITicket } from '@interfaces';

type TicketConstructor = Omit<
  ITicket,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

export class Ticket {
  subject: string;
  message: string;
  user_id: number;

  constructor(props: TicketConstructor) {
    Object.assign(this, props);
  }
}
