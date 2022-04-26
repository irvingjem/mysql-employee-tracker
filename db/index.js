// importing connection to the db
const connection = require('./connection');

// Create class to store all data
class Database {}

module.exports = new Database(connection);