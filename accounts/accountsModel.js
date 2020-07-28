const db = require("../data/dbConfig.js");
const { generateDefaultBoard } = require("../boards/boardsModel.js");

module.exports = {
  add,
  findAll,
  findBy,
  findById,
};

async function findAll() {
  return await db("accounts").select("id", "username").orderBy("id");
}

async function findBy(filter) {
  return await db("accounts").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("accounts").insert(user, "id");
    const newUser =  await findById(id);
    await generateDefaultBoard(newUser);
    return newUser
  } catch (error) {
    throw error;
  }
}

async function findById(id) {
  return await db("accounts").where({ id }).first();
}