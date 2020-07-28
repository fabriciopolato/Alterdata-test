import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import knex from '@database';
import User from '../controllers/UsersController';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'keyboard_cat'
};

export default new Strategy(options, async (payload, done) => {
  try {
    const user = await knex<User>('users').where('id', payload.id).first();
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error);
  }
});
