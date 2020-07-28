
exports.up = function(knex) {
  return knex.schema
  .createTable("accounts_boards", tbl => {
    tbl.increments();
    tbl.integer("account_id").notNullable().unsigned()
    .references("accounts.id").onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer("board_id").notNullable().unsigned()
    .references("boards.id").onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable("boards_articles", tbl => {
    tbl.increments();
    tbl.integer("account_id").notNullable().unsigned()
    .references("accounts.id").onDelete('CASCADE').onUpdate('CASCADE');
    tbl.integer("article_id").notNullable().unsigned()
    .references("articles.id").onDelete('CASCADE').onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("accounts_boards")
    .dropTableIfExists("boards_articles");
};
