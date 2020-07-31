import knex from '@database';
import { Request, Response, NextFunction } from 'express';
import { Ticket } from '@models/Ticket';
import { IUser, ITicket } from '@interfaces';

export default class TicketsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { subject, message }: ITicket = req.body;
    const { id } = req.user as IUser;

    const ticket = new Ticket({ subject, message, user_id: id });

    try {
      const [createdTicket] = await knex<ITicket>('tickets')
        .insert(ticket)
        .returning('*');

      return res.status(201).json(createdTicket);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as IUser;

    try {
      const foundTickets = await knex<ITicket>('tickets')
        .join('users', 'users.id', '=', 'tickets.user_id')
        .select('tickets.*', 'users.email', 'users.username')
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

  async getClosedTickets(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as IUser;
    try {
      const foundTickets = await knex<ITicket>('tickets')
        .join('users', 'users.id', '=', 'tickets.user_id')
        .select('tickets.*', 'users.email', 'users.username')
        .where('user_id', id)
        .whereNot('deleted_at', null);

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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      const { id } = req.params;

      await knex<ITicket>('tickets')
        .where('id', id)
        .update({ message, updated_at: new Date() });
      const updatedTicket = await knex<ITicket>('tickets').where('id', id);

      return res.status(201).json(updatedTicket);
    } catch (error) {
      next(error);
    }
  }

  async reopen(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await knex<ITicket>('tickets')
        .where('id', id)
        .update({ deleted_at: null });
      const updatedTicket = await knex<ITicket>('tickets').where('id', id);

      return res.status(201).json(updatedTicket);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const ticket_id: number = Number(req.params.id);
    const user = req.user as IUser;

    try {
      // soft-delete para manter os tickets no database depois dos tickets serem encerrados
      const archivedTicket = await knex<ITicket>('tickets')
        .where('id', ticket_id)
        .where('user_id', user.id)
        .update('deleted_at', new Date());

      const [deletedTicket] = await knex<ITicket>('tickets')
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
