const db = require('../data/dbConfig.js')
module.exports = {
  add,
  findAll,
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
async function findAll(id) {
  return await db("boards").select("*").orderBy("created_at");
}

async function findBy(filter) {
  return await db("boards").where(filter).orderBy("created_at");
}

async function add(board) {
  try {
    const [id] = await db("boards").insert(board, "id");
    return await findById(id);
  } catch (error) {
    throw error;
  }
}

async function findById(id) {
  return await db("boards").where({ id }).first();
}

async function update(board) {
  Object.keys(board[0]).forEach(async item => {
    await db('boards').where('id', '=', board[1]).update({[item]: board[0][item]})
  })
  // await db('boards')
  // .where({ id: board[1] })
  // .update(board[0])
  return await findById(board[1])
}

async function remove(board_id) {
  return db('boards')
  .where({ id: board_id })
  .del()
}