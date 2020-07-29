const db = require("./data/dbConfig")
module.exports = {
    SECRET: process.env.JWT_SECRET || 'pintereach',
    PORT : process.env.PORT || 5000,
    
}