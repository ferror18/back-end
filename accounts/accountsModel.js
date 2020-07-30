const { generateDefaultBoard } = require("../boards/boardsModel.js");
const { genericModel: {
  genFindAll,
  genFindBy,
  genAdd,
  genFindById
} } = require("../globalServices")
const dbname = 'accounts';


module.exports = {
  add,
  findAll,
  findBy,
  findById,
};

async function findAll() {
  return await genFindAll(dbname);
}
async function findBy(filter) {
  try {
    return await genFindBy(filter, dbname)
  } catch (error) {
    return error
  }
}

async function add(user) {
  try {
    const newUser = await genAdd(user, dbname);
    await generateDefaultBoard(newUser);
    return await newUser
  } catch (error) {
    return error
  }
}

async function findById(id) {
  return await genFindById(id, dbname)
}