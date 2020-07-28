exports.up = function(knex) {
    return knex.schema
    .createTable('boards', tbl => {
      tbl.increments();
          tbl.integer("owner").notNullable().unsigned()
          .references("accounts.id").onDelete('CASCADE').onUpdate('CASCADE');
          tbl.string("name", 256).notNullable();
          tbl.boolean("is_public").notNullable().defaultTo(false);
          tbl.boolean("is_default").notNullable().defaultTo(false);
          tbl.string("description", 1024);
          tbl.binary("thumbnail");
          tbl.timestamps(true, true);
    })
    .createTable('articles', tbl => {
        tbl.increments();
        tbl.string('url', 1024);
        tbl.string('title', 256);
        tbl.string('host', 128);
        tbl.string('author', 128);
        tbl.binary('thumbnail');
        tbl.timestamp("published_on").defaultTo(knex.fn.now());
        tbl.timestamps(true, true);
    })
    .table("accounts", tbl => tbl.timestamps(true, true))
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('boards')
    .dropTableIfExists('articles')
    .table("accounts", tbl => {
        tbl.dropColumns("created_at", "updated_at");

    })
  };