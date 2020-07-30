const db = require('../data/dbConfig.js');
const { genericModel: {
  genFindAll,
  genFindBy,
  genAdd,
  genFindById,
  genUpdate,
  genRemove
} } = require("../globalServices")
const dbname = 'articles';

module.exports = {
  add,
  findBy,
  findById,
  remove,
  update
};


  async function findBy(filter) {
    return await genFindBy(filter, dbname)
  }
  
  async function add(user, genDF) {
    return await genAdd(user, dbname, genDF);
  }
  
  async function findById(id) {
    return await genFindById(id, dbname)
  }
  
  async function update(info) {
    return await genUpdate({...info, dbname})
  }
  
  async function remove(board_id) {
    return await genRemove(board_id,dbname);
  }