import Knex from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('tickets', table => {
    table.timestamp('deleted_at');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable('tickets', table => {
    table.dropColumn('deleted_at');
  });
};
