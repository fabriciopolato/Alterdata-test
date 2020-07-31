import knex from '@database';
import { Request, Response, NextFunction } from 'express';
import { IComment, IUser, ITicket } from '@interfaces';
import { Comment } from '@models/Comment';

export default class CommentsController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { comment }: IComment = req.body;
    const ticket_id = Number(req.params.id);
    const { id } = req.user as IUser;

    if (isNaN(ticket_id) || !ticket_id) {
      return res.status(400).json({ message: 'parâmetro inválido' });
    }

    const newComment = new Comment({
      comment,
      user_id: id,
      ticket_id
    });

    try {
      const [createdComment] = await knex<IComment>('comments')
        .insert(newComment)
        .returning('*');

      await knex<ITicket>('tickets')
        .update('updated_at', new Date())
        .where('id', ticket_id);

      return res.status(201).json(createdComment);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const ticket_id = req.params.id;

    try {
      const foundComments = await knex<IComment>('comments').where(
        'ticket_id',
        ticket_id
      );

      // if (foundComments.length === 0) {
      //   return res.json({
      //     message: 'Não existem tickets abertos para este usuário'
      //   });
      // }

      return res.json(foundComments);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const ticket_id = Number(req.params.ticket_id);
    const comment_id = Number(req.params.comment_id);
    const { id } = req.user as IUser;

    try {
      const deletedComment = await knex<IComment>('comments')
        .where('id', comment_id)
        .where('ticket_id', ticket_id)
        .where('user_id', id)
        .del();

      if (deletedComment) {
        return res.status(200).json(deletedComment);
      }
      return res.status(403).json({
        message:
          'ticket e/ou comentário inexistentes ou usuário não está autorizado a apagar este comentário'
      });
    } catch (error) {
      next(error);
    }
  }
}
