// Update with your config settings.
import path from 'path';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'alterdata_test',
      user: 'postgres',
      password: '0102'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
      extension: 'ts'
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
  }
};
