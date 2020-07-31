import { Router } from 'express';
import UsersController from '@controllers/UsersController';
import TicketsController from '@controllers/TicketsController';
import passport from 'passport';
import CommentsController from '@controllers/CommentsController';

const routes = Router();
const usersController = new UsersController();
const ticketsController = new TicketsController();
const commentsController = new CommentsController();

routes.post('/login', usersController.login);

routes.use(passport.authenticate('jwt', { session: false }));

routes.post('/tickets', ticketsController.create);
routes.get('/tickets', ticketsController.get);
routes.get('/tickets/archived', ticketsController.getClosedTickets);
routes.put('/tickets/:id', ticketsController.update);
routes.delete('/tickets/:id', ticketsController.delete);
routes.put('/tickets/:id/reopen', ticketsController.reopen);

routes.post('/tickets/:id/comments', commentsController.create);
routes.get('/tickets/:id/comments', commentsController.get);
routes.delete(
  '/tickets/:ticket_id/comments/:comment_id',
  commentsController.delete
);

export default routes;
