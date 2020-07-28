import { Router } from 'express';
import UsersController from '@controllers/UsersController';
import TicketsController from '@controllers/TicketsController';

const routes = Router();
const usersController = new UsersController();
const ticketsController = new TicketsController();

routes.post('/users', usersController.login);
routes.post('/tickets', ticketsController.create);
routes.put('/tickets', ticketsController.update);

export default routes;
