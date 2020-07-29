const db = require("./data/dbConfig")
const { kcOptions } = require('./globalConstants.js');
const knexCleaner = require('knex-cleaner');
module.exports = {
    SECRET: process.env.JWT_SECRET || 'pintereach',
    PORT : process.env.PORT || 5000,
    kcOptions : {
        mode: 'truncate', // Valid options 'truncate', 'delete'
        restartIdentity: true, // Used to tell PostgresSQL to reset the ID counter
        ignoreTables: ["knex_migrations", "knex_migrations_lock"]
      },
    resetDB: async () => {
      await knexCleaner.clean(db, kcOptions);
      // await db("accounts").del();
      // await db("boards").del();
      // await db("articles").del();
      // await db.raw('ALTER TABLE ' + 'accounts' + ' AUTO_INCREMENT = 1');
      // await db.raw('ALTER TABLE ' + 'boards' + ' AUTO_INCREMENT = 1');
      // await db.raw('ALTER TABLE ' + 'articles' + ' AUTO_INCREMENT = 1');

      // await db.raw('TRUNCATE TABLE accounts, boards, articles RESTART IDENTITY CASCADE;');
      // await db.raw('TRUNCATE TABLE boards RESTART IDENTITY CASCADE;');
      // await db.raw('TRUNCATE TABLE articles RESTART IDENTITY CASCADE;');
      
      // const x = 'TRUNCATE TABLE accounts RESTART IDENTITY CASCADE;';
      // const y = 'TRUNCATE TABLE boards RESTART IDENTITY CASCADE;';
      // const z = 'TRUNCATE TABLE articles RESTART IDENTITY CASCADE;';
      // await db.raw(x+y+z);
    }
}