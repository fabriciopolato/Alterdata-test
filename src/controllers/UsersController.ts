import knex from '@database';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '@interfaces';

const createToken = (user: IUser) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, 'keyboard_cat');
};

export default class UsersController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const foundUser = await knex<IUser>('users').where({ email }).first();

      if (!foundUser) {
        return res
          .status(403)
          .json({ message: 'Usuário e/ou senha incorretos' });
      }

      const isMatched = await bcrypt.compare(password, foundUser.password);
      if (!isMatched) {
        return res
          .status(403)
          .json({ message: 'Usuário e/ou senha incorretos' });
      }

      return res.json({ user: foundUser, token: createToken(foundUser) });
    } catch (error) {
      next(error);
    }
  }
}
