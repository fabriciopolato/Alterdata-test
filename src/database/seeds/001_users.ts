import * as Knex from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  const salt = await bcrypt.genSalt(10);

  const promise1 = bcrypt.hash('1212', salt);
  const promise2 = bcrypt.hash('1212', salt);

  const [hash1, hash2] = await Promise.all([promise1, promise2]);

  await knex('users').insert([
    { email: 'joao@email.com', password: hash1 },
    { email: 'carlos@email.com', password: hash2 }
  ]);
}
