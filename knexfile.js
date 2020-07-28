const pgConnection = process.env.DATABASE_URL || "postgresql://postgres:password@localhost/pintereach_development";

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
        connection: "postgresql://postgres:password@localhost/pintereach_testing",
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