
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accounts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {username: 'HouseofStark', password: 'winterfell'},
        {username: 'flammingPuddle', password: '12345street'},
        {username: 'jhon', password: 'dabdabdab'}
      ]);
    });
};
