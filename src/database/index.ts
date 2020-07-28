const knexfile = require('../../knexfile');
const knex = require('knex');

export default knex(knexfile.development);
