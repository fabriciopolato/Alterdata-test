import express from 'express';
import '@controllers/UsersController';
import routes from './routes/users.routes';

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log('Server is running');
});
