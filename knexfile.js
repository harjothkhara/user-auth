const pg = require('pg');
require('dotenv').config();

const pgUser = process.env.PG_USER;
const pgDb = process.env.PG_DB;

// const localPgConnection = `postgres://${pgUser}@localhost/${pgDb}`;

// knex migrate:latest --env production
// knex seed:run --env production

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth.db3'
    },
    useNullAsDefault: true,
    migrations: { directory: './database/migrations' },
    seeds: { directory: './database/seeds' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done); //enforce FK
      }
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done); //enforce FK
      }
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
