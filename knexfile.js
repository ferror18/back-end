const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/hobbits";
const pgSearchPathZero = process.env.SEARCH_PATH_ZERO || 'knex';
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: [ pgSearchPathZero, 'public'],
    migrations: {
        directory: "./database/migrations",
    },
    seeds: {
        directory: "./database/seeds",
    }
  },
  testing: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: [ pgSearchPathZero, 'public'],
    migrations: {
        directory: "./database/migrations",
    },
    seeds: {
        directory: "./database/seeds",
    }
  },
  // for Heroku
    production: {
        client: "pg",
        connection: pgConnection,
        searchPath: [ pgSearchPathZero, 'public'],
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        }
    },
};