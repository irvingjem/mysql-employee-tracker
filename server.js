const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MySQL password
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employee tracker database.')

);


function userPrompts() {
    inquirer.prompt(
            [{
                type: "list",
                message: "What would you like to do?",
                choices: ['View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Delete a department',
                    'Add a role',
                    'Delete a role',
                    'Add an employee',
                    'Delete an employee',
                    "Update an employee's role",
                    "Update an employee's manager",
                    'Quit'
                ],
                name: 'userNav'

            }]
        )
        .then(answer => {
            if (answer.userNav === 'View All Departments') {
                // create new function to add data to db 
                db.query('SELECT * from department', (error, results) => {
                    if (error) throw error;
                    //display results in table format 
                    console.table(results);

                    //ask the question again 
                    userPrompts();
                })

                // Functions needed
                // Add a role
                // Delete a Role
                // Add an Employee
                // Delete an employee
                // Update an employee
                // Update an employee manager


            } else {
                //Function to exit application

                console.log("Goodbye")
                process.exit(0);
            }
        });
}


//start point 
userPrompts();