const db = require('../data/dbConfig.js');

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
async function findAll() {
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

async function update({ updates, id}) {
  try {
    for (const iterator of Object.keys(updates)) {
      await db('boards').where('id', '=', id).update({[iterator]: updates[iterator]})
    }
    return await findById(id)
  } catch (error) {
    return error
  }
}

async function remove(board_id) {
  return db('boards')
  .where({ id: board_id })
  .del()
}