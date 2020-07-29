const db = require('../data/dbConfig.js'); 

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    remove,
    update
  };
  
  async function findAll(board_id) {
    return await db("articles").select("*").where("board_id", board_id).orderBy("created_at");
  }
  
  async function findBy(filter) {
    return await db("articles").where(filter).orderBy("created_at");
  }
  
  async function add(article) {
    try {
      const [id] = await db("articles").insert(article, "id");
      return await findById(id);
    } catch (error) {
      throw error;
    }
  }
  
  async function findById(id) {
    return await db("articles").where({ id }).first();
  }
  
  async function update({ updates, id }) {
    try {
      for (const iterator of Object.keys(updates)) {
        await db('articles').where('id', '=', id).update({[iterator]: updates[iterator]})
      }
      return await findById(id)
    } catch (error) {
      return error
    }
  }
  
  async function remove(article_id) {
    return db('articles')
    .where({ id: article_id })
    .del()
  }