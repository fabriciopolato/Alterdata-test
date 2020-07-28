import { Router } from 'express';
import UsersController from '@controllers/UsersController';
import TicketsController from '@controllers/TicketsController';
import passport from 'passport';

const routes = Router();
const usersController = new UsersController();
const ticketsController = new TicketsController();

routes.post('/users', usersController.login);

routes.use(passport.authenticate('jwt', { session: false }));

routes.get('/users', (req, res) => {
  res.send('hello world');
});
routes.post('/tickets', ticketsController.create);
routes.put('/tickets', ticketsController.update);

export default routes;
