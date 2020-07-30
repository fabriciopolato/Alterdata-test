import { Router } from 'express';
import UsersController from '@controllers/UsersController';
import TicketsController from '@controllers/TicketsController';
import passport from 'passport';

const routes = Router();
const usersController = new UsersController();
const ticketsController = new TicketsController();

routes.post('/login', usersController.login);

routes.use(passport.authenticate('jwt', { session: false }));

routes.post('/tickets', ticketsController.create);
routes.get('/tickets', ticketsController.get);
routes.get('/tickets/archived', ticketsController.getClosedTickets);
routes.put('/tickets/:id', ticketsController.update);
routes.delete('/tickets/:id', ticketsController.delete);
routes.put('/tickets/reopen/:id', ticketsController.reopen);

export default routes;
