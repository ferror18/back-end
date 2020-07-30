const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/pintereach_development";

const pgConnectionTesting = process.env.HEROKU_POSTGRESQL_CHARCOAL_URL || "postgresql://postgres@localhost/pintereach_testing";

module.exports = {
    development: {
        client: "pg",
        connection: pgConnection,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    testing: {
        client: "pg",
        connection: pgConnectionTesting,
        pool: {
            min: 1,
            max: 1,
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    // for Heroku
    production: {
        client: "pg",
        connection: pgConnection,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },
};