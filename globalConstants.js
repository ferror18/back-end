module.exports = {
    SECRET: process.env.JWT_SECRET || 'pintereach',	    SECRET: process.env.JWT_SECRET || 'pintereach',
    PORT : process.env.PORT || 5000,	    PORT : process.env.PORT || 5000,
    kcOptions : {	
        mode: 'truncate', // Valid options 'truncate', 'delete'	
        restartIdentity: true, // Used to tell PostgresSQL to reset the ID counter	
        ignoreTables: ["knex_migrations", "knex_migrations_lock"]	
      }
} 