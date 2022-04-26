// importing connection to the db
const connection = require('./connection');

// Create class to store all data
class Database {
    // add connection
    constructor(connection) {
        this.connection = connection;
    };

    // add all functions from inquirer 
    // All departments
    // All roles
    // All employees
    // All managers
    // All departments
    // Add departments
    // Delete Departments
    // Add role
    // Delete role
    // Add employee
    // Delete employee
    // Update employee role
    // Update manager role
}


// exporter for other files
module.exports = new Database(connection);