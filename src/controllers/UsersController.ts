// import { User } from '@models/User';
import knex from '@database';

export default class UsersController {
  async login(req, res) {
    // const user = new User();
    const results = await knex('users');
    return res.json(results);
  }
}
