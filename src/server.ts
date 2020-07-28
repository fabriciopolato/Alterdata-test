import express from 'express';
import '@controllers/UsersController';
import routes from './routes/users.routes';

const app = express();

app.use(express.json());
app.use('/', routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(3333, () => {
  console.log('Server is running');
});
