import express, { Request, Response, NextFunction } from 'express';
import '@controllers/UsersController';
import routes from './routes/users.routes';
import passport from 'passport';
import passportMiddleware from './middleware/passport';

const app = express();

app.use(passport.initialize());

passport.use(passportMiddleware);

app.use(express.json());
app.use('/', routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

app.listen(3333, () => {
  console.log('Server is running');
});
