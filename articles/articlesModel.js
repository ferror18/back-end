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
  
  async function update(article) {
    Object.keys(article[0]).forEach( async item => {
       await db('articles').where('id', '=', article[1]).update({[item]: article[0][item]})
    })
    return await findById(article[1])
  }
  
  async function remove(article_id) {
    return db('articles')
    .where({ id: article_id })
    .del()
  }