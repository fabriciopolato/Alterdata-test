import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('comments', table => {
    table.increments('id');
    table.string('comment').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.integer('ticket_id').references('tickets.id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('comments');
};
