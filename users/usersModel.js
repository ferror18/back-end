const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("accounts").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("accounts").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("accounts").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("accounts").where({ id }).first();
}