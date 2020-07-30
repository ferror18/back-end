const db = require("./data/dbConfig");
const { kcOptions } = require('./globalConstants.js');	
const knexCleaner = require('knex-cleaner');
const { response } = require("express");



const globalServices = {};

// This function resest the database
globalServices.resetDB = async () => {await knexCleaner.clean(db, kcOptions)};

//This funtion makes a param required

globalServices.isRequired = parameterName => { return throw new Error(`Missing required argument`)};

//This function serves to DRY code that reapeats across models
globalServices.genericModel = {

    genFindById: async (id, dbname) => {
      return await db(dbname).where({ id }).first();
    },

    genFindAll: async dbname => {
      return await db(dbname).select("*").orderBy("created_at");
    },

    genFindBy: async (filter, dbname) => {
      return await db(dbname).where(filter).orderBy("id");
    },

    genAdd: async (record, dbname) => {
      try {
        const [id] = await db(dbname).insert(record, "id");
        const newRecord =  await globalServices.genericModel.genFindById(id, dbname);
        return await newRecord
      } catch (error) {
        throw error;
      }
    },

    genUpdate: async ({updates, id, dbname}) => {
      try {
       for (const iterator of Object.keys(updates)) {
        await db(dbname).where('id', '=', id).update({[iterator]: updates[iterator]})
      }
      return await findById(id)
    } catch (error) {
      console.log(updates, id, dbname);
      return error
    }
    },

    genRemove: async (board_id, dbname) => {
      try {
        return await db(dbname).where({ id: board_id }).del()
      } catch (error) {
        throw error
      }
    }
}


module.exports = globalServices;