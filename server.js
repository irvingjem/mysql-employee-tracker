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
            message: "what would you like to do?",
            choices: ["add a department", 'View All Departments', "add a role", 'View All Roles', "add an employee", 'View All Employees', "Update Employe Role", "Exit"],
            name: 'userNav'

        }]
    )

    .then(answer => {
        if (answer.userNav === 'View All Departments') {
            //creta new function to add data to db 
            db.query('SELECT * from department', (error, results) => {
                if (error) throw error;
                //display results i ntable format 
                console.table(results);

                //ask the question again 

                userPrompts();
            })


        } else {
            //in case of exit 

            console.log("Goodbye")
            process.exit(0);
        }
    });
}


//start point 
userPrompts();