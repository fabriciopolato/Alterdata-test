import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('tickets', table => {
    table.increments('id');
    table.string('subject').notNullable();
    table.string('message').notNullable();
    table.integer('user_id').references('users.id').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('tickets');
};
