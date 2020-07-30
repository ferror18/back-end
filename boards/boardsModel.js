const db = require('../data/dbConfig.js');
const { genericModel: {
  genFindBy,
  genAdd,
  genFindById,
  genUpdate,
  genRemove
} } = require("../globalServices")
const dbname = 'boards';

module.exports = {
  add,
  findBy,
  findById,
  generateDefaultBoard,
  remove,
  update
};

async function generateDefaultBoard(user) {
    await db("boards").insert({
        owner: user.id,
        name: user.username,
        is_default: true
    })
}

async function findBy(filter) {
  return await genFindBy(filter, dbname)
}

async function add(board) {
  return await genAdd(board, dbname);
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