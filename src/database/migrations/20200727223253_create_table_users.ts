import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('users');
};
