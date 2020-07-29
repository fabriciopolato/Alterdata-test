import knex from '@database';
import { Request, Response, NextFunction } from 'express';
import { Ticket } from '@models/Ticket';
import { User } from '@models/User';

export default class TicketsController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as User;
    try {
      // soft-delete para manter os tickets no database depois dos tickets serem encerrados
      const foundTickets = await knex<Ticket>('tickets')
        .where('user_id', id)
        .where('deleted_at', null);

      if (foundTickets.length === 0) {
        return res.json({
          message: 'Não existem tickets abertos para este usuário'
        });
      }

      return res.json(foundTickets);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { subject, message }: Ticket = req.body;
    const { id } = req.user as User;

    const ticket = new Ticket({ subject, message, user_id: id });

    try {
      const [createdTicket] = await knex<Ticket>('tickets')
        .insert(ticket)
        .returning('*');

      return res.status(201).json(createdTicket);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      const { id } = req.params;

      await knex('tickets')
        .where({ id })
        .update({ message, updated_at: new Date() });
      const updatedTicket = await knex<Ticket>('tickets').where('id', id);

      return res.status(201).json(updatedTicket);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const ticket_id: number = Number(req.params.id);
    const user = req.user as User;

    try {
      const archivedTicket = await knex<Ticket>('tickets')
        .where('id', ticket_id)
        .where('user_id', user.id)
        .update('deleted_at', new Date());

      const [deletedTicket] = await knex<Ticket>('tickets')
        .where('id', ticket_id)
        .where('user_id', user.id);

      if (archivedTicket) {
        return res.status(200).json(deletedTicket);
      }
      return res.status(403).json({
        message: 'usuário não está autorizado a encerrar este ticket'
      });
    } catch (error) {
      next(error);
    }
  }
}
