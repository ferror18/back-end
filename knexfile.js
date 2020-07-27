const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/hobbits";

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./data/pintereachdb.db3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    testing: {
        client: "sqlite3",
        connection: {
            filename: "./data/test_pintereachdb.db3",
        },
        useNullAsDefault: true,
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