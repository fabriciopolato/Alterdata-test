import knex from '@database';
import { Request, Response, NextFunction } from 'express';

export default class TicketsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await knex('tickets').insert({});

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      await knex('tickets').update({ message });
    } catch (error) {
      next(error);
    }
  }
}
