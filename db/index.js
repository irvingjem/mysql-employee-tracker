// importing connection to the db
const connection = require('./connection');

// Create class to store all data
class Database {}


// exporter for other files
module.exports = new Database(connection);